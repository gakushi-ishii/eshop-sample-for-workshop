# Git / GitHub エージェント運用ルール

このファイルは、AI エージェントによる Git / GitHub 操作の不変条件を定める。
実行環境・依存関係・品質ゲートは `.github/copilot-instructions.md`、具体的な実行手順は
`.github/skills/` を参照する。

## ブランチ運用

- `main` を共有の基準ブランチとし、変更は短命な作業ブランチから Pull Request で反映する。
- GitHub Copilot App や Copilot Cloud Agent が生成した作業ブランチ名はそのまま使用する。
  ブランチ名の変更や、独自の命名規則への変換は行わない。
- Pull Request の base は `main` とする。
- `main` へ直接 push しない。`main` への反映は Pull Request を通じて行う。

## Skill の起動

- GitHub Copilot App のローカル worktree でファイルの作成・編集・削除を伴う依頼では、
  最初の編集前に
  `.github/skills/git-workflow/SKILL.md` を読み、その手順に従う。
- `package.json` / `package-lock.json` / `tsconfig*.json` の変更や依存追加では、
  あわせて `.github/skills/add-dependency-safely/SKILL.md` に従う。
- 相談、調査、レビュー、計画、読み取り、コマンド実行だけの依頼では
  `git-workflow` を起動しない。

## Human-in-the-loop

- GitHub Copilot App のローカル worktree では、コミットを作業の意図を残す証跡として扱う。
  コミット前に日本語のメッセージ案を提示し、ユーザーが承認するまで実行しない。
- コミット後、ユーザーが GitHub Copilot App の **Create draft PR** を使用し、
  Pull Request のタイトルと本文を確認・修正してから Draft Pull Request を作成する。
- Copilot Cloud Agent が作成したコミットと Pull Request は、Issue の受け入れ条件、
  差分、テスト、CI を人がレビューしてからマージを判断する。
- ユーザーの明示的な依頼なしに Pull Request のマージを行わない。
- force push、rebase、履歴の書き換え、その他の破壊的な Git 操作は、
  ユーザーの明示的な承認なしに行わない。

## Issue 対応

- バグ修正では、Issue の再現手順と期待結果を確認し、まず問題を再現するテストを追加する。
- Pull Request のレビューでは、受け入れ条件ごとに変更とテストを対応付ける。
