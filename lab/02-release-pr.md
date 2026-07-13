# Lab 02: Release PR で main へ反映する

**テーマ:** AI Ready 化した変更を既存 SDLC の Pull Request としてリリースする

## シナリオ

Lab 01 の変更を Pull Request にして CI を通し、workshop fork の `main` へマージする。
ローカルで働いた依存ガードレールが、サーバー側の CI（`npm ci`）でも同じように効くことを確認する。

## 前提条件

- Lab 01 が完了し、`react-router-dom` が lockfile と同期されていること。
- Step 3 のデモ変更が残っていないこと。

## 手順

### 1. 差分を確認して検証する

```text
現在の差分を確認し、このラボと無関係な変更が含まれていないことを確認してください。
react-router-dom が package-lock.json と同期されていることも確認してください。
その後 npm test と npm run build を実行し、結果を報告してください。
```

### 2. Release PR を作成する

```text
商品詳細ルーティングの変更をコミットし、ブランチを Push して Pull Request を作成してください。
PR 本文には、変更概要、追加した依存とその理由（ADR へのリンク）、テストとビルドの結果を書いてください。
```

### 3. CI を確認して main へマージする

- PR の CI（`npm ci` / `npm test` / `npm run build`）が成功することを確認する。
- **自分の workshop fork** の `main` へマージする。

```text
この PR の CI チェックの状態を説明してください。npm ci が何を保証しているかも述べてください。
```

## 期待する結果 / 残る成果物

- CI が成功した Release PR。
- `main` に商品詳細ルーティングと 3 層ガードレールが反映される。
- 次のラボで Cloud Agent が `main` のルールとガイドを読める状態になる。

> CI の `npm ci` は、lockfile と `package.json` が不整合だと失敗する。
> Lab 01 のガードレールが手元で防いだ事故を、CI が最終防波堤として再確認している。

---

← [Lab 01](./01-implement-with-guardrails.md) ・ 次へ → [Lab 03: 運用バグを Cloud Agent へ委託する](./03-delegate-bug-to-cloud-agent.md)
