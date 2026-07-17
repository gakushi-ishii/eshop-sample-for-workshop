# ADR-0001: 画面遷移に react-router-dom を採用する

- ステータス: 採用
- 日付: 2026-07-17

## 背景

商品一覧から商品詳細（`/product/:id`）へ遷移し、詳細から一覧へ戻る回遊を実現する
必要があった。従来は `App.tsx` の `useState` による単一画面構成で、URL と画面が
対応していなかった。

## 決定

`react-router-dom`（v7 系）を導入し、`/`（一覧）と `/product/:id`（詳細）を
URL ベースのルートとして定義する。

## 理由

- ブラウザ URL と画面状態が一致し、直リンク・戻る/進む・共有が自然に機能する。
- React 18 / Node 20+ と互換（peer: react >=18、engines: node >=20）。
- デファクトのルーティングライブラリで学習コストが低く、ワークショップ教材に適する。

## 却下した代替案

- 依存追加なしの state ベース切替: URL が変わらず直リンク・ブラウザ戻るに非対応。
  詳細ページの要件（実 URL `/product/:id`）を満たせないため却下。

## 影響

- ランタイム依存が 1 つ増える（`react-router-dom` と推移依存の計 4 パッケージ）。
- `main.tsx` を `BrowserRouter` でラップし、`App.tsx` をルート定義に再構成した。
- SPA の直リンクは `vite dev/preview` の history fallback で動作する。
