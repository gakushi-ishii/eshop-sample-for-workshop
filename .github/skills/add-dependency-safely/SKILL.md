---
name: add-dependency-safely
description: "新しい npm パッケージ（ランタイム/開発依存）を追加・更新するときの安全な手順。package.json / package-lock.json / tsconfig を変更する前に読む。WHEN: dependency, package, npm install, package.json, package-lock.json, react-router, 依存追加, ライブラリ追加, パッケージ追加"
---

# 依存を安全に追加する

新しいパッケージを追加するときの手順。環境依存の事故（手元では動くが、他の担当者の
`npm ci` や CI で壊れる）を防ぐことが目的。判断の前提は `.github/copilot-instructions.md`
の「実行環境と技術スタック」を参照する。

## いつ使うか

- ランタイム依存（`dependencies`）や開発依存（`devDependencies`）を追加・更新するとき
- `package.json` / `package-lock.json` / `tsconfig*.json` を変更するとき

## 手順

### 1. 必要性と代替案を確認する

- その依存で何を解決するかを一言で説明できるようにする。
- 標準 API（`Intl`、`URL`、`fetch` など）や既存依存で代替できないか確認する。
- 代替できない理由が説明できる場合だけ追加へ進む。

### 2. 互換性を確認する

- 追加候補の `engines`（Node）と peerDependencies（React 等）を確認する。
- **Node 20 / React 18.3 と互換であること。** React 19 専用などの非互換版を選ばない。
- 型定義が必要な場合（`@types/*`）も合わせて確認する。

### 3. 追加して lockfile を同期する

- `package.json` を直接手編集して終わりにしない。**`npm install <pkg>` を実行して
  `package-lock.json` を同期する**（バージョン範囲を固定したい場合も `npm install` で反映）。
- `npm ci` が通る状態（`package.json` と `package-lock.json` が整合）を保つ。

```shell
npm install <package-name>
```

### 4. 型とビルドへの影響を確認する

- `tsconfig` は原則変更しない。変更が必要な場合は `target` / `module` / `moduleResolution`
  を避け、影響範囲を説明する。
- 型チェックを実行する。

```shell
npm run build
```

### 5. 判断を記録する

- 依存追加は典型的な設計判断。`docs/decisions/` に短い ADR（30 行以内）を残す。
  - 何を追加したか、なぜ必要か、却下した代替案、影響（バンドル・互換）
- INDEX があれば更新する。

### 6. 検証して報告する

- `npm test` と `npm run build` を実行する。
- 追加した依存、lockfile 同期の有無、テスト結果を報告する。
- 未解決事項（peer 警告など）は成功扱いにせず明記する。

## やってはいけないこと

- `package.json` だけ変更して `package-lock.json` を同期しない（`npm ci` が失敗する）。
- lockfile を手で編集する。
- 目的を説明できない依存を「便利そう」で追加する。
- `tsconfig` の解決方式を安易に変更する。

## 補足: postToolUse フックによる自動チェック

このリポジトリでは、`package.json` / `package-lock.json` / `tsconfig*.json` を編集すると
`.github/hooks/` の依存ガードが自動で走り、lockfile 不整合・環境非互換・型エラーを検出する。
フックが失敗を報告したら、上の手順で修正してから先へ進むこと。
