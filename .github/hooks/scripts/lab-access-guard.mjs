#!/usr/bin/env node

import { readFileSync } from 'node:fs';

const LAB_PATH = /(^|[^A-Za-z0-9_.-])(?:\.\/)?lab(?:\/|$)/i;

function containsLabPath(value) {
  if (typeof value === 'string') {
    let decoded = value;
    try {
      decoded = decodeURIComponent(value);
    } catch {
      // Keep the original value when it is not URI encoded.
    }
    return LAB_PATH.test(decoded.replaceAll('\\', '/'));
  }

  if (Array.isArray(value)) {
    return value.some(containsLabPath);
  }

  if (value && typeof value === 'object') {
    return Object.values(value).some(containsLabPath);
  }

  return false;
}

// lab アクセスガードのモード切替 (環境変数)。
// LAB_GUARD_MODE=edit のときだけガードを無効化し、lab/** への参照を許可する。
// この環境変数は Copilot CLI を起動する人間が設定する運用を前提とする
// (Hook は CLI プロセスが spawn するため、エージェントのシェルからは変更できない)。
// 既定 (未設定または practice) では従来どおり lab/** への参照を deny する。
const isEditMode = (process.env.LAB_GUARD_MODE || '').trim().toLowerCase() === 'edit';

const input = readFileSync(0, 'utf8');
const payload = JSON.parse(input);

if (!isEditMode && containsLabPath(payload.toolArgs)) {
  process.stdout.write(
    JSON.stringify({
      permissionDecision: 'deny',
      permissionDecisionReason:
        'lab/** は受講者向け教材のため、実装コンテキストとして参照できません。',
    }),
  );
}
