# Outdoor eShop

登山・キャンプ向けアウトドア用品店の EC サンプルアプリです。
GitHub Copilot ハンズオンの教材として作られています。現状の機能は **商品一覧** と **全文検索** のみ。

GitHub Copilot App で **AI Ready な開発ライフサイクル**を体験するハンズオンです。
依存関係・実行環境の事故を防ぐガードレール（Custom Instructions・Skill・Hook）が
リポジトリに仕込まれており、機能実装の中で実際に効く様子を確認します。
手順は [`lab/`](./lab/README.md) にまとめています。

---

## 🚀 はじめに

本ワークショップは **GitHub Copilot App** で操作することを前提にしています。
まずは [ラボ目次](./lab/README.md) を開き、上から順番に進めてください（本編の目安は 90 分）。

| # | タイトル | 体験すること |
| :-: | --- | --- |
| 00 | [プロジェクトを準備する](./lab/00-setup-and-preflight.md) | Project・worktree・Setup・Run・Canvas |
| 01 | [機能実装でガードレールを体験する](./lab/01-implement-with-guardrails.md) | ルーティング実装・スキル発火・Hook 検証・発火デモ |
| 02 | [Release PR で main へ反映する](./lab/02-release-pr.md) | 差分確認・テスト・PR・CI・マージ |
| 03 | [運用バグを Cloud Agent へ委託する](./lab/03-delegate-bug-to-cloud-agent.md) | バグ再現・Issue 起票・委託 |
| 04 | [新しいセッションへ引き継ぐ](./lab/04-handoff-to-new-session.md) | 会話なしで前提を復元 |
| 05 | [Cloud Agent の PR をレビューする](./lab/05-review-cloud-agent-pr.md) | Issue↔差分↔テスト↔CI の対応付け |

---

## ✅ 前提

| 項目 | 内容 |
| --- | --- |
| 操作環境 | GitHub Copilot App |
| ローカル実装・検証（Lab 00〜02, 04） | Node.js 20 と npm |
| Cloud Agent 委託（Lab 03, 05） | GitHub ホスト環境（参加者の PC に Node.js は不要） |

> バックエンドや Azure などの外部サービスへの依存はありません。
> 通常は Copilot App が npm で起動します。Docker / Dev Container の予備手順は
> [講師ガイド](./lab/instructor-guide.md#lab-00-復旧) を参照してください。

### npm レジストリの事前確認

このリポジトリでは、利用環境ごとのネットワーク要件に対応できるよう、プロジェクトの
`.npmrc` でレジストリを固定していません。

- 公開 npm レジストリへ直接アクセスできる環境では、npm の既定値を使用します。
- 直接アクセスが許可されない環境では、組織が指定するレジストリをユーザーまたは
  マシン単位で設定してください。
- 組織固有のレジストリ URL や認証情報は、リポジトリの `.npmrc` に追加しないでください。

Setup の前に、現在の参照先と疎通を確認します。

```shell
npm config get registry
npm view react-router-dom version engines peerDependencies --json
```

メタデータ取得が失敗した場合は、所属組織のネットワーク・パッケージ管理手順に従って
レジストリを設定してから、`npm ci` を実行してください。

---

## 🧱 技術スタックと仕込まれたガードレール

| 項目 | 採用技術 |
| --- | --- |
| フロントエンド | React 18 + TypeScript |
| ビルド/開発サーバー | Vite 6 |
| テスト | Vitest + Testing Library |
| 実行環境 | Node.js 20（Dev Container / Codespaces で固定） |

| ガードレール | 実体 | 役割 |
| --- | --- | --- |
| 方針 | [`.github/copilot-instructions.md`](./.github/copilot-instructions.md) | 実行環境・技術スタック・依存ルールを常時提示 |
| 手順 | [`.github/skills/add-dependency-safely/`](./.github/skills/add-dependency-safely/SKILL.md) | 依存追加の正しい手順を実行 |
| 機械検証 | [`.github/hooks/`](./.github/hooks/hooks.json) | 依存・環境ファイル編集後に自動チェック |

---

## 📝 ライセンス

MIT License. 学習・ワークショップ用途で自由にご利用ください。
商品画像は [mslearn-dotnet-cloudnative](https://github.com/MicrosoftDocs/mslearn-dotnet-cloudnative) のサンプル素材を利用しています。
