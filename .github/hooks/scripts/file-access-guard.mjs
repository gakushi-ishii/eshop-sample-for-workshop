#!/usr/bin/env node
// ファイル操作制御ガード (preToolUse hook)
//
// 目的は 2 つ。
//   1. lab/** (受講者向け教材) がエージェントのコンテキストへ注入されるのを防ぐ。
//   2. ガードそのものの無効化 (.env の書き換え・Hook スクリプトの書き換え) を防ぐ。
//
// このスクリプトは hooks.json から 2 つのエントリで呼ばれ、argv[2] で用途を受け取る:
//   - "read"  … 読み取り系ツール (+ シェル) 向け。lab/** と .env への参照を deny。
//   - "write" … 書き込み系ツール (+ シェル) 向け。lab/**, .env,
//                .github/hooks/** への書き込みを deny。
// シェル (bash/powershell) は読み書き両方が可能なため両エントリにマッチさせ、
// read/write を厳密に判別できない分は安全側 (deny) に倒す。
//
// モード切替は .env の LAB_GUARD_MODE で行う (人間が設定する運用)。
//   - LAB_GUARD_MODE=edit             … ガードを全解除 (教材編集モード)。
//   - 未設定 / practice / その他       … ガード有効 (通常の実習モード)。
// .env は Hook スクリプトが機械的に読むだけで、エージェントのコンテキストには
// 載せない。エージェントは practice 中に .env を書けないため、自分で edit へ
// 切り替えられない (自己迂回の防止)。
//
// 追加の npm 依存は使わない。Node.js 標準モジュールのみ。

import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');

// lab/** … 先頭・区切りの直後に来る "lab" セグメント。
const LAB_PATH = /(^|[^A-Za-z0-9_.-])(?:\.\/)?lab(?:\/|$)/i;
// .env … 単独の .env のみ (.env.sample / .env.local などは対象外)。
const ENV_FILE = /(^|[^A-Za-z0-9_.-])\.env(?![A-Za-z0-9_.-])/i;
// .github/hooks/** … Hook の定義・スクリプト。
const HOOKS_PATH = /(^|[^A-Za-z0-9_.-])\.github\/hooks(?:\/|$)/i;

function resolveMode() {
  // 起動時 env を明示指定していれば優先する (人間が CLI 起動前に設定した場合)。
  const fromEnv = (process.env.LAB_GUARD_MODE || '').trim().toLowerCase();
  if (fromEnv) return fromEnv;

  // 既定は .env ファイルを実行時に読む。App がバックグラウンド起動でも
  // ファイル編集だけで即時に切り替えられる。
  const envPath = resolve(repoRoot, '.env');
  if (!existsSync(envPath)) return 'practice';
  try {
    for (const raw of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
      const line = raw.trim();
      if (!line || line.startsWith('#')) continue;
      const eq = line.indexOf('=');
      if (eq === -1) continue;
      if (line.slice(0, eq).trim() !== 'LAB_GUARD_MODE') continue;
      return line
        .slice(eq + 1)
        .trim()
        .replace(/^['"]|['"]$/g, '')
        .toLowerCase();
    }
  } catch {
    // 読めない場合は安全側 (practice) にフォールバックする。
  }
  return 'practice';
}

// file_text / new_str / old_str などの「内容」フィールドは検査対象から除外する。
// これらに lab/.env/.github-hooks の文字列が含まれても、書き込み先が安全なら
// ブロックしない (内容一致による過剰ブロックの防止)。パス系や command は検査する。
const CONTENT_KEYS = new Set([
  'file_text',
  'new_str',
  'old_str',
  'content',
  'text',
  'body',
  'file_content',
  'replacement',
]);

function normalize(value) {
  let decoded = value;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    // URI エンコードでない場合は元の値を使う。
  }
  // Windows のパス区切り (\) を / に正規化する。
  return decoded.replaceAll('\\', '/');
}

// toolArgs は JSON 文字列で渡されることがある。オブジェクトへ復元してから走査する。
// 復元前の文字列を直接正規化すると、JSON エスケープ (\\) が // になり、
// 内部にスラッシュを持つパターン (.github/hooks) が一致しなくなるため必ず復元する。
function parseArgs(raw) {
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw);
    } catch {
      return raw; // JSON でなければそのまま扱う。
    }
  }
  return raw;
}

// 検査対象の文字列 (パス系・command) を集める。内容フィールドは除外する。
function collectPathStrings(value, out) {
  if (typeof value === 'string') {
    out.push(value);
    return;
  }
  if (Array.isArray(value)) {
    for (const v of value) collectPathStrings(v, out);
    return;
  }
  if (value && typeof value === 'object') {
    for (const [key, v] of Object.entries(value)) {
      if (CONTENT_KEYS.has(key)) continue;
      collectPathStrings(v, out);
    }
  }
}

function matchesAny(strings, patterns) {
  return strings.some((s) => {
    const normalized = normalize(s);
    return patterns.some((re) => re.test(normalized));
  });
}

function deny(reason) {
  process.stdout.write(
    JSON.stringify({ permissionDecision: 'deny', permissionDecisionReason: reason }),
  );
}

function main() {
  // edit モードでは全ガードを解除する。
  if (resolveMode() === 'edit') return;

  let payload;
  try {
    payload = JSON.parse(readFileSync(0, 'utf8'));
  } catch {
    return; // 解釈できないペイロードは判断せず素通りさせる。
  }
  // toolArgs は JSON 文字列で渡ることがある。オブジェクトへ復元し、
  // パス系フィールドの文字列だけを集めて検査する (内容フィールドは除外)。
  const args = parseArgs(payload.toolArgs);
  const targets = [];
  collectPathStrings(args, targets);

  // guard 種別 (hooks.json から渡す)。未知の場合は最も厳しい write 扱い。
  const guard = (process.argv[2] || 'write').toLowerCase();

  if (matchesAny(targets, [LAB_PATH])) {
    deny('lab/** は受講者向け教材のため、実装コンテキストとして参照できません。');
    return;
  }
  if (matchesAny(targets, [ENV_FILE])) {
    deny(
      '.env はガードのモード切替ファイルのため、エージェントからの参照・変更はできません。' +
        'モードの切替は人間が .env を編集して行ってください。',
    );
    return;
  }
  if (guard !== 'read' && matchesAny(targets, [HOOKS_PATH])) {
    deny(
      '.github/hooks/** はガードの定義のため、書き込みはできません (読み取りは可能です)。',
    );
    return;
  }
}

main();
