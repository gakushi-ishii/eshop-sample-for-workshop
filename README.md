# Outdoor eShop

登山・キャンプ向けアウトドア用品店の EC サンプルアプリです。
GitHub Copilot ハンズオンの教材として作られています。現状の機能は **商品一覧** と **全文検索** のみ。

追加機能実装や修正をエージェントに依頼させるハンズオンです。手順はコンテンツごとに分割し、
[`lab/`](./lab/README.md) にまとめています。

---

## 🚀 はじめに

本ワークショップは **GitHub Copilot App** で操作することを前提にしています。
まずは [ラボ目次](./lab/README.md) を開き、上から順番に進めてください。

| # | タイトル | 内容 |
| :-: | --- | --- |
| 00 | [概要とアプリの全体像](./lab/00-overview.md) | アプリ概要・技術スタック・構成・課題の使い分け |
| 01 | [現在のアプリを起動して確認する](./lab/01-explore-current-app.md) | 現状調査・npm 起動・Browser Canvas 操作・課題発見 |
| 02 | [商品詳細ページを作る](./lab/02-challenge-a-product-detail.md) | ローカル Agent Mode・差分確認・Browser Canvas 検証 |
| 03 | [検索の価格ソート／絞り込みを任せる](./lab/03-challenge-b-search-sort.md) | Coding Agent（Issue → PR → CI） |
| 04 | [Coding Agent の PR を検証する](./lab/04-review-and-verify-pr.md) | 差分・テスト・ビルド・Browser Canvas・レビュー |

---

## ✅ 前提

| 項目 | 内容 |
| --- | --- |
| 操作環境 | GitHub Copilot App |
| Lab 01 / 02 / 04（ローカル確認） | Node.js 20 と npm |
| Lab 03（Coding Agent に委任） | GitHub ホスト環境（参加者の PC に Node.js は不要） |

> バックエンドや Azure などの外部サービスへの依存はありません。
> Lab 03 だけは GitHub ホスト環境の Copilot Coding Agent を利用します。
> 通常は Copilot App が npm で起動します。Docker / Dev Container は
> [Lab 01 の予備手順](./lab/01-explore-current-app.md#起動できない場合の予備手順)を参照してください。

---

## 🧱 技術スタック

| 項目 | 採用技術 |
| --- | --- |
| フロントエンド | React 18 + TypeScript |
| ビルド/開発サーバー | Vite 6 |
| テスト | Vitest + Testing Library |
| 実行環境 | Node.js 20（Dev Container / Codespaces で固定） |

---

## 📝 ライセンス

MIT License. 学習・ワークショップ用途で自由にご利用ください。
商品画像は [mslearn-dotnet-cloudnative](https://github.com/MicrosoftDocs/mslearn-dotnet-cloudnative) のサンプル素材を利用しています。
