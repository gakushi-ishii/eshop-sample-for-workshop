# Lab 02: PR を作成し、main へ反映する

**テーマ:** Main へのマージに機械的な品質ゲートと人の確認フローを組みこむ。

## シナリオ

- GitHub Copilot App では PR の自動作成や Auto マージが可能だが、認識負債・齟齬を考慮して、本ラボではこれらは実施しない。
- エージェントにはドラフト案だけを作成させ、PR タイトル・本文をを人が確認する手順を踏む。
- 依存ガードレールやテスト、型チェック・ビルド検証といったゲートを、サーバー側の CI に組み込むことで、機械的に品質を担保する。

## 前提条件

- Lab 01 の実装・検証とコミットが完了していること。
- GitHub Actions が利用できる。

## 手順

### 1. Create draft PR でタイトルと本文を確認する

コミット完了後、GitHub Copilot App UI の **Create draft PR** を選ぶ。

Draft PR が作成されたら、github.com から [Pull Requests] の内容を確認する。

- base リポジトリが upstream ではなく、自身のフォークリポジトリであることを確認する。
- base ブランチが `main` であることを確認する。
- タイトルが本実装とマッチしているか、本文に背景や変更内容等が含まれているか確認する。
- CI が自動で走り、正常に完了しているかを確認する。
- コンフリクトが発生していないか確認する。

### 2. copilot にレビューを依頼する

PR 画面の右上にある **Reviewers** から Copilot を Request する。

**View session** から Cloud Agent がレビューをしている様子を確認する。

Copilot のレビュー結果を確認し、変更提案があれば採用するか検討する。

### 3. main へマージする

CI と Draft Pull Request の内容を確認したら Ready for review に変更する。
その後、**Copilot App の UI** 上の「Merge pull request」ボタンを押して自分のフォークリポジトリの `main` へマージする。

## 期待する結果

- 人が確認したタイトルと本文を持つ PR を作成する。
- `main` に商品詳細ルーティングと AI Ready なルール・手順・検証が反映される。
- サーバー側の CI が走り、品質チェックを行う。

---

← [Lab 01](./01-implement-with-guardrails.md) ・ 次へ → [Lab 03: 運用バグを Cloud Agent へ委託する](./03-delegate-bug-to-cloud-agent.md)
