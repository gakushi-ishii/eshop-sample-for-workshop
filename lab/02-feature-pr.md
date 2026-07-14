# Lab 02: Feature PR で main へ反映する

**テーマ:** コミットと Draft Pull Request の証跡を人が確認する Human-in-the-loop

## シナリオ

Lab 01 の変更をコミットし、GitHub Copilot App の **Create draft PR** から
workshop fork の `main` に向けた Draft Pull Request を作成する。
AI が提案したコミットメッセージと、App UI が生成した Pull Request のタイトル・本文を
人が確認する。ローカルで働いた依存ガードレールを、サーバー側の CI でも再確認する。

## 前提条件

- Lab 01 の実装と検証が完了していること。
- `git-workflow` がコミットメッセージ案を提示し、承認を待っていること。

## 手順

### 1. コミットメッセージ案を確認する

Lab 01 の最後に表示されたメッセージ案が、実際の変更と目的を説明できているか確認する。

- 変更内容が具体的か。
- 変更していない内容を含んでいないか。
- 後から履歴を読む人が目的を理解できるか。

必要に応じて `メッセージを修正` を選び、案を更新する。
内容に合意したら `このメッセージでコミット` を選ぶ。

**期待する結果:**

- 人が承認するまでコミットされない。
- 承認した日本語メッセージでコミットが作成される。
- `git-workflow` はコミット結果を報告して終了し、push や Pull Request 作成は行わない。

### 2. Create draft PR でタイトルと本文を確認する

コミット完了後、Copilot App UI の **Create draft PR** を選ぶ。

1. base リポジトリが upstream ではなく、自分の workshop fork であることを確認する。
2. base ブランチが `main` であることを確認する。
3. App UI が生成したタイトルから変更の目的が分かるか確認する。
4. 本文に変更概要、検証結果、追加依存と ADR、レビュー時の確認ポイントが
   含まれているか確認する。
5. 必要に応じてタイトルと本文を修正する。
6. Draft Pull Request を作成する。

**期待する結果:**

- 作業ブランチの変更から Draft Pull Request が作成される。
- `main` へ直接 push されない。
- 人が確認したタイトルと本文が Draft Pull Request に残る。
- CI（`npm ci` / `npm test` / `npm run build`）が自動で走る。

### 3. CI を確認して main へマージする

Draft Pull Request の CI がすべて成功していることを確認する。

次を Copilot App に貼り付ける。

```text
この Pull Request の CI チェックの状態を説明してください。
npm ci が何を保証しているかも述べてください。
```

CI と Draft Pull Request の内容を確認したら Ready for review に変更する。
その後、**Copilot App の UI** 上の「Merge pull request」ボタンを押して
自分の workshop fork の `main` へマージする。

**期待する結果:**

- CI がすべて成功している。
- `main` へ直接 push せず、Pull Request を通じて変更が反映される。

## 期待する結果 / 残る成果物

- 人が確認したコミットメッセージ。
- 人が確認したタイトルと本文を持つ Feature PR。
- `main` に商品詳細ルーティングと AI Ready なルール・手順・検証が反映される。
- 次のラボで Cloud Agent が `main` の Instructions、AGENTS、Skills を参照できる。

> CI の `npm ci` は、lockfile と `package.json` が不整合だと失敗する。
> Lab 01 の Hook が手元で防いだ事故を、CI が最終防波堤として再確認している。

---

← [Lab 01](./01-implement-with-guardrails.md) ・ 次へ → [Lab 03: 運用バグを Cloud Agent へ委託する](./03-delegate-bug-to-cloud-agent.md)
