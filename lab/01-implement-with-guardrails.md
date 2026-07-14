# Lab 01: 機能実装でガードレールを体験する

**テーマ:** 機能追加を依頼し、結果から再現性を支えるガードレールを理解する

## シナリオ

Outdoor eShop に商品詳細ページへの**画面遷移（ルーティング）**を追加する。
React SPA でルーティングを実現するには、新しいランタイム依存
`react-router-dom` が必要になる。

受講者は通常の機能追加として依頼するだけでよい。Copilot App がリポジトリの
Instructions、Skills、Hooks を利用し、環境や依存関係のルールに沿って実装する様子を
結果から確認する。

## 前提条件

- Lab 00 を完了していること。
- 開発サーバーが起動し、Browser Canvas で表示できること。

## 手順

### 1. 機能追加を依頼する

Plan モード（`Shift+Tab`）に切り替えて、次を Copilot App に貼り付ける。

```text
商品カードから商品詳細ページ（/product/:id）へ遷移できるようにしたいです。
まず実装プランを作成してください。実装はまだしないでください。
ルーティングライブラリの追加が必要なら、その扱いも含めてください。
実装時には npm test と npm run build を実行し、Browser Canvas で商品カードから
詳細ページへ遷移できることと、一覧へ戻れることまで確認してください。
```

### 2. プランを確認して実装する

プランが次の内容を満たしているか確認する。

- 商品詳細ルートと、一覧へ戻る導線が含まれている。
- 新しい依存関係の必要性と扱いが含まれている。
- テスト、build、Browser Canvas での確認が含まれている。

内容に合意したら実装を進める。Skill 名や Hook を追加で指示する必要はない。

実装中は、Copilot App が必要に応じて次の処理を行う様子を確認する。

- `react-router-dom` が Node 20 / React 18 と互換であるか確認する。
- `npm install` で `package.json` と `package-lock.json` を同期する。
- 依存ファイルの編集後に Hook で不整合や環境互換性を確認する。
- 依存を採用した理由を `docs/decisions/` の ADR へ記録する。
- `npm test` と `npm run build` を実行する。
- Browser Canvas で画面遷移を確認する。

### 3. 実装結果を確認する

**期待する結果:**

- 商品カードから `/product/:id` へ遷移できる。
- 商品詳細ページから一覧へ戻れる。
- `react-router-dom` が `package.json` と `package-lock.json` に同期されている。
- `docs/decisions/` に依存判断の ADR が残っている。
- `npm test` と `npm run build` が成功している。
- 作業完了後、`git-workflow` が日本語のコミットメッセージ案を提示して承認を待つ。

### 4. コミット確認を Lab 02 へ引き渡す

コミットメッセージ案と次の選択肢が表示されたら、まだ選択せず Lab 02 を開く。

- `このメッセージでコミット`
- `メッセージを修正`
- `コミットしない`

> [!NOTE]
> コミット確認が表示されなかった場合だけ、次を貼り付ける。
>
> ```text
> git-workflow スキルに従って、現在の変更をコミットする準備をしてください。
> ```

## 期待する結果 / 残る成果物

- 自動生成された短命な作業ブランチ上のローカル変更。
- 商品詳細ルーティング。
- `react-router-dom` を含む同期済みの `package.json` / `package-lock.json`。
- `docs/decisions/` の依存判断 ADR。
- 人の承認を待つコミットメッセージ案。

> 実装が終わらない場合は
> [講師ガイド](./instructor-guide.md#lab-01-復旧) の recovery asset を使う。

## Optional: 裏側の仕組みを確認する

Lab 02 の完了後、興味があれば Quick Chat で次を確認する。

```text
Lab 01 の機能実装について、次を実際に残ったファイルや実行結果と対応付けて説明してください。
1. Instructions と AGENTS.md が伝えたルール。
2. add-dependency-safely と git-workflow Skills が実行した手順。
3. Hook と CI が検証した内容。
```

---

← [Lab 00](./00-setup-and-preflight.md) ・ 次へ → [Lab 02: Feature PR で main へ反映する](./02-feature-pr.md)
