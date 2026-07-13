# 講師ガイド

受講者向けのラボ本文には載せない、進行・復旧・fallback の情報をまとめる。

## タイムライン（本編 90 分）

| 時間 | ラボ | 合流ポイントで確認すること |
| --- | --- | --- |
| 0〜8分 | Lab 00 | 全員が New worktree セッションを作成し、Run/Canvas を確認できたか |
| 8〜40分 | Lab 01 | 依存追加でスキルと Hook が発火し、Step 3 のデモ差分が残っていないか |
| 40〜52分 | Lab 02 | Release PR の CI が成功し、main にマージされたか |
| 52〜64分 | Lab 03 | Bug Issue が作成され Cloud Agent に委託されたか |
| 64〜74分 | Lab 04 | 新セッションが会話なしで前提を説明できたか |
| 74〜90分 | Lab 05 | Cloud Agent PR を受け入れ条件と対応付けてレビューできたか |

合流ポイント: 8, 40, 52, 64, 74 分。

## 3 層ガードレール（仕込み済み）

- `.github/copilot-instructions.md` — 方針（実行環境・技術スタック・依存ルール）
- `.github/skills/add-dependency-safely/SKILL.md` — 手順（依存追加の正しい流れ）
- `.github/hooks/hooks.json` + `scripts/dependency-guard.mjs` — 機械検証（lockfile 同期・環境互換・型チェック）

Hook は `package.json` / `package-lock.json` / `tsconfig*.json` が dirty のときだけ発火する。
Windows では `powershell` エントリから `node` で実行される。追加の npm 依存はない。

## Lab 00 復旧

- Setup スクリプトが失敗する場合は、セッションの Terminal で手動 `npm ci` を実行する。
- Run でポート 5173 が開かない場合は、既存の dev サーバーを停止してから再度 Run する。
- Node.js が使えない参加者は、Dev Container / Codespaces、または `docker compose up` を案内する。

## Lab 01 復旧

- 実装が時間内に終わらない場合は、講師が用意した**商品詳細ルーティング完成 checkpoint ブランチ**を
  pull して Lab 02 へ進める。
- Step 3 のデモ後に差分が残ってしまった場合は、`git checkout -- package.json` で元へ戻す。
- スキルが自動起動しない場合は、`/agent` や明示的な指示（「add-dependency-safely スキルに従って」）で促す。
- Hook の発火を明示的に見せたい場合は、Terminal で次を実行する。

  ```text
  !node .github/hooks/scripts/dependency-guard.mjs
  ```

  監視対象ファイルが dirty のときだけ結果が出る。

## Lab 02 復旧

- CI が `npm ci` で失敗する場合、lockfile 未同期の可能性が高い。`npm install` で同期させて再 Push。
- Release が進まない場合は、guardrail 入りの checkpoint ブランチから PR を作る。

## Lab 03〜05: Cloud Agent の変動対策

- Cloud Agent は完了までに時間がかかる。Lab 04 の待ち時間を活用する。
- <a id="lab-05-fallback"></a>**Lab 05 fallback:** Cloud Agent が時間内に完了しない、または利用できない場合は、
  同じ Issue と受け入れ条件から作成した**共有 fallback PR**をレビュー対象にする。
  fallback PR には、あえて 1 点だけ受け入れ条件を満たさない箇所（例: 全角スペース未対応）を残しておくと、
  レビューで修正依頼を出す練習になる。

## 事前に用意しておくもの

- 商品詳細ルーティング完成 checkpoint ブランチ（Lab 01 fallback）
- guardrail 入り release checkpoint ブランチ（Lab 02 fallback）
- 共有 fallback Cloud Agent PR（Lab 05 fallback）
