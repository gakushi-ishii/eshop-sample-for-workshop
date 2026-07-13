# 00. 概要とアプリの全体像

Outdoor eShop は、登山・キャンプ向けアウトドア用品店の EC サンプルアプリです。
GitHub Copilot ハンズオンの教材として作られており、現状の機能は **商品一覧** と **全文検索** のみです。

このハンズオンでは、GitHub Copilot App で現在のアプリを調査・起動してから、
**あえて実装していない機能**をエージェントに実装させます。
ローカル Agent Mode と Coding Agent の異なる使い方を、コピー可能なプロンプトで体験します。

> バックエンドや Azure などの外部サービスへの依存はありません。
> Lab 03 だけは GitHub ホスト環境の Copilot Coding Agent を利用します。

---

## 🧱 技術スタック

| 項目 | 採用技術 |
| --- | --- |
| フロントエンド | React 18 + TypeScript |
| ビルド/開発サーバー | Vite 6 |
| テスト | Vitest + Testing Library |
| 実行環境 | Node.js 20（Dev Container / Codespaces で固定） |

---

## 📁 ディレクトリ構成

```
src/
├── components/
│   ├── Header.tsx        # ヘッダー（店名・商品数）
│   ├── SearchBar.tsx     # 検索ボックス
│   ├── ProductGrid.tsx   # 商品グリッド
│   └── ProductCard.tsx   # 商品カード
├── data/
│   └── products.ts       # サンプル商品データ（9商品）
├── lib/
│   ├── search.ts         # 全文検索ロジック（純粋関数）
│   └── search.test.ts    # 検索ロジックのテスト
├── types.ts              # Product 型
├── App.tsx               # 画面全体の組み立て
└── main.tsx              # エントリポイント
public/
└── images/               # 商品画像（product1〜9.png）
```

---

## 🎓 ワークショップ課題の全体像

最初に現在の状態を確認し、その後に2つの機能追加を異なる方法で進めます。

| Lab | 内容 | 体験する使い方 |
| --- | --- | --- |
| [01](./01-explore-current-app.md) | 現在のアプリを調査・起動して課題を発見する | ローカル Agent Mode + Browser Canvas |
| [02](./02-challenge-a-product-detail.md) | 商品詳細ページを作る | ローカル Agent Mode + 差分確認 + Browser Canvas |
| [03](./03-challenge-b-search-sort.md) | 検索結果の価格ソート／絞り込みを追加する | Coding Agent（Issue → PR → CI） |
| [04](./04-review-and-verify-pr.md) | Coding Agent の PR を検証する | 差分、テスト、ビルド、Browser Canvas、レビュー |

### 🧭 使い分けの判断ルール

> **受け入れ条件をテストで表現できる → Coding Agent（Issue→PR）**
> **目で見て確かめたい → ローカル Agent Mode → Push**

- **商品詳細ページ**：レイアウトや画面遷移は**ブラウザで見ないと正解が分からない**ため、
  `npm run dev` で表示を見ながらその場で修正する同期的なループが向いています。
- **価格ソート／絞り込み**：受け入れ条件を**テストで表現できる**ため、
  実装と自動テストは Issue を投げて非同期に任せられます。完成後の使いやすさは Lab 04 で人が確認します。

---

← [ラボ目次](./README.md) ・ 次へ → [01. 現在のアプリを起動して確認する](./01-explore-current-app.md)
