# Lab 01: 機能実装でガードレールを体験する

**テーマ:** 依存追加を伴う機能実装で、仕込まれた 3 層ガードレールが実際に効く様子を見る

## シナリオ

Outdoor eShop に商品詳細ページへの**画面遷移（ルーティング）**を追加する。
React SPA でルーティングを実現するには新しいランタイム依存 `react-router-dom` が必要になる。
この「依存を追加する」場面で、リポジトリに仕込まれた 3 層のガードレールが働く様子を確認する。

| 層 | 実体 | 役割 |
| --- | --- | --- |
| 方針 | `.github/copilot-instructions.md` | 実行環境・技術スタック・依存ルールを常時提示 |
| 手順 | `.github/skills/add-dependency-safely/` | 依存追加の正しい手順を実行 |
| 機械検証 | `.github/hooks/` | 依存・環境ファイル編集後に自動チェック |

## 前提条件

- Lab 00 を完了していること。
- 開発サーバーが起動し、Browser Canvas で表示できること。

## 手順

### Step 1: 現状と 3 層ガードレールを確認する

次を Copilot App に貼り付ける。

```text
このリポジトリを調べて、次を簡潔に説明してください。
1. アプリの目的と現在の機能、主要な src ファイル。
2. .github/copilot-instructions.md、.github/skills/、.github/hooks/ に何が設定されているか。
   それぞれ「方針」「手順」「機械検証」のどれに当たるかも述べてください。
このステップではコードを変更しないでください。
```

**期待する結果:** 商品一覧と検索だけがあること、3 層ガードレールの役割が説明される。

### Step 2: ルーティングを実装する（依存追加でガードレールが働く）

Plan モード（`Shift+Tab`）に切り替えてから貼り付ける。

```text
商品カードから商品詳細ページ（/product/:id）へ遷移できるようにしたいです。
まず実装プランを作成してください。実装はまだしないでください。
ルーティングライブラリの追加が必要なら、その扱いも含めてプランに書いてください。
```

プランに合意したら実装を進める。依存を追加する局面で `add-dependency-safely` スキルが働き、
`react-router-dom` の互換確認 →  `npm install` による lockfile 同期 → 型確認 → ADR 記録が行われる。
`package.json` の編集直後には依存ガード Hook が走り、lockfile 同期を検証する。

**期待する結果:**
- `react-router-dom` が `npm install` で追加され、`package-lock.json` が同期される。
- `docs/decisions/` に依存判断の ADR が残る。
- 商品詳細ルートが実装される。

### Step 3: ガードレールをわざと発火させて確かめる

ガードレールが「事故を止める」瞬間を体験する。次を貼り付ける。

```text
学習のための確認です。package.json の dependencies に "date-fns": "^3.6.0" を追記するだけで、
npm install はまだ実行しないでください。追記後にファイルを保存し、その後 git status を確認してください。
```

**期待する結果:** `package.json` 編集直後に依存ガード Hook が発火し、
「package.json と package-lock.json が不整合。`npm ci` が失敗する」と指摘する。

続けて修正させる。

```text
先ほどの指摘のとおり、この不整合は他の担当者の New worktree の Setup（npm ci）や CI で初めて失敗します。
追記した date-fns は今回不要なので取り消し、package.json を元に戻してください。差分が残っていないことも確認してください。
```

**期待する結果:** `date-fns` の追記が取り消され、`package.json` の差分が消える。

### Step 4: 検証する

```text
npm test と npm run build を実行し、結果を報告してください。
その後、Browser Canvas で商品カードから詳細ページへ遷移できることと、一覧へ戻れることを確認してください。
```

## 期待する結果 / 残る成果物

- 商品詳細ルーティングのローカル変更。
- `react-router-dom` を含む同期済みの `package.json` / `package-lock.json`。
- `docs/decisions/` の依存判断 ADR。
- Step 3 のデモ変更は残っていない。

> ガードレールが働く前に依存を手で壊した状態が残ると Lab 02 で混乱する。差分を必ず確認する。
> 実装が終わらない場合は [講師ガイド](./instructor-guide.md#lab-01-復旧) の checkpoint を使う。

---

← [Lab 00](./00-setup-and-preflight.md) ・ 次へ → [Lab 02: Release PR で main へ反映する](./02-release-pr.md)
