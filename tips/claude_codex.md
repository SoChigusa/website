---

title: 'AIオーケストレーションで半自動作業'
date: '2026-10-05'
description: 'Claude Code のクラウド環境から Codex CLI を呼び出し、計画・実装・検証を繰り返すための設定とプロンプト'
image: 'Claude_spark.svg'
images:
  - src: 'Claude_spark.svg'
    alt: 'Claude'
  - src: 'OpenAI_blossom.svg'
    alt: 'OpenAI'

---

ロゴ：<a href="https://www.anthropic.com/news" target="_blank" rel="noreferrer">Claude（Anthropic）</a> / <a href="https://openai.com/brand/" target="_blank" rel="noreferrer">OpenAI</a>

Claude Code を指揮役（オーケストレーター）、Codex CLI を実装担当にして、GitHub リポジトリ内で半自動的に作業を進めるための設定メモ。最終的に選んだのは、Claude Code のクラウド環境に Codex を入れ、次の計画・実装・検証ループを回す構成。

**計画（Claude） → 実装（Codex） → 検証（Claude） → 先頭に戻る**

Claude なり ChatGPT なりにやりたいことを伝えればやり方を教えてもらえるが、その過程でいくつか非自明な設定作業が必要だったので残しておく。

以下では、GitHub 上のリポジトリと作業用ブランチ `LLM` を用意しておく。

## 1. Claude Code と GitHub を接続する

Claude Code に GitHub アカウントを接続し、Claude GitHub App に対象リポジトリへのアクセスを許可する。Team / Enterprise では、先に組織の Owner に **Organization settings → Connectors** で GitHub コネクタを有効にしてもらう（[接続手順](https://code.claude.com/docs/en/web-quickstart)）。

セッション作成時に対象リポジトリを選ぶ。GitHub の認証はクラウド側のプロキシが扱うので、セッション内に GitHub トークンを手動で渡す必要はない（[GitHub 認証](https://code.claude.com/docs/en/claude-code-on-the-web#github-authentication-options)）。

GitHub 側では、Rulesets またはブランチ保護で `main` への直接 push と削除を禁止しておく。

## 2. クラウド環境を設定する

Claude デスクトップアプリの **Code → Cloud**、または [claude.ai/code](https://claude.ai/code) で、セッションのタイトルバーにある **クラウド環境メニュー → Edit → Network access** を開く。`Custom` を選び、**Allowed domains** に次の2つを1行ずつ追加する。**Also include default list of common package managers** は有効のままにする（[ネットワーク設定](https://code.claude.com/docs/en/cloud-environments#network-access)）。

```text
auth.openai.com
chatgpt.com
```

同じ画面で、環境変数とセットアップスクリプトを設定する。

- **Environment variables**：`BASH_MAX_TIMEOUT_MS`=`1800000`
- **Setup script**：下のスクリプトで Codex CLI やその他必要なパッケージを導入する。

```shell
#!/bin/bash
npm install -g @openai/codex || true
pip install --break-system-packages -q numpy scipy matplotlib pandas mpmath || true
pip install nbformat nbclient nbconvert ipykernel
```

最後の1行は Jupyter 関連パッケージの導入用。設定を保存しても現在のセッションで接続できない場合は、更新した環境で新しいセッションを作る。

## 3. セッション内で認証・動作確認する

設定したクラウド環境と対象リポジトリを選び、開始元のブランチを `LLM` にしてセッションを作る。権限モードは **Auto** が使えれば選び、なければ **Accept edits** にする。クラウドではセッション用の別ブランチが作られるため、Claude に、編集前に作業ツリーが clean であることを確認して `LLM` へ切り替えるよう指示する（[セッションの開始](https://code.claude.com/docs/en/web-quickstart#start-a-task)）。

Codex は **ChatGPT アカウントで認証**し、そのアカウントの利用枠・クレジットを使う。

API キーの環境変数を渡さず、`forced_login_method="chatgpt"` で認証方式を固定するため、次をリポジトリのルートに `run_codex.sh` として保存する。このスクリプトは `LLM` ブランチに commit・push しておく。以下の認証・実行はこのスクリプト経由で行う。

```shell:run_codex.sh
#!/bin/sh
unset OPENAI_API_KEY CODEX_API_KEY
exec codex -c 'forced_login_method="chatgpt"' "$@"
```

クラウドではデバイスコード認証を使う。あらかじめ ChatGPT のセキュリティ設定（組織アカウントでは管理者の権限設定）で有効にし、ネットワーク設定の保存後、Claude にセッション内で次を実行させる（[認証の説明](https://developers.openai.com/codex/auth/#login-on-headless-devices)）。

```shell
sh run_codex.sh login --device-auth
```

Claude から表示された URL とワンタイムコードを受け取り、手元のブラウザで URL を開く。利用したい ChatGPT アカウントでログインし、コードを入力して承認する。認証が完了したら、Claude に次を実行させる。

```shell
sh run_codex.sh login status
sh run_codex.sh exec --sandbox read-only "Reply with exactly CODEX_OK"
```

`codex login status` が ChatGPT 認証を示し、`CODEX_OK` が返ることを確認する。対象プロジェクトの依存関係を整え、変更前のテストも実行しておく。今回の研究リポジトリでは次のコマンドを使う。

```shell
(cd src && python3 -m unittest discover -s . -p 'test_*.py')
```

さらに、リポジトリのルートで push 先の固定とフックを設定する。セッションを作り直した場合も設定する。

```shell
git config remote.origin.push refs/heads/LLM:refs/heads/LLM
cat > .git/hooks/pre-push <<'EOF'
#!/bin/sh
while read local_ref local_sha remote_ref remote_sha; do
  if [ "$remote_ref" != "refs/heads/LLM" ]; then
    echo "pre-push: only LLM is allowed" >&2
    exit 1
  fi
done
exit 0
EOF
chmod +x .git/hooks/pre-push
```

## 4. Claude にループを任せる

準備が済んだら、次のプロンプトを送る。テストコマンドと生成物の保存先はプロジェクトに合わせて変更する。最初の数反復は動作を見ながら進める。

```text
あなたはこのクラウドセッションのオーケストレーターです。
実装は同じ環境の Codex CLI に任せ、
計画 → 実装 → あなた自身による検証 → フィードバックを繰り返してください。

ルール：
- 作業は LLM ブランチのみ。push は git push origin LLM のみ。
- main の変更、force push、ブランチ削除、reset --hard、git clean は禁止。
- Codex は --sandbox workspace-write で実行し、sandbox を無効にしない。
- Codex は run_codex.sh 経由で呼び出し、ChatGPT 認証を維持する。
- 秘密情報を指示ファイル・ログ・コミットに残さない。

開始時：
1. ブランチが LLM、作業ツリーが clean であることを確認し、
   git pull --ff-only と sh run_codex.sh login status を実行する。
   ブランチや認証方式の不一致、コマンドの失敗なら止まる。
2. orchestration/ 内の TASK.md と PROGRESS.md があれば読み、続きから再開する。
   なければゴール・完了判定・編集禁止のファイルを私に確認し、
   TASK.md に書いて合意してから始める。
3. ルートの AGENTS.md に作業ブランチ、編集禁止範囲、テスト方法を記す。
   テストは (cd src && python3 -m unittest discover -s . -p 'test_*.py')。
   CSV は plot/data、図は figure に保存する。既存のルールは維持する。
4. orchestration/prompts/ と orchestration/logs/ を作り、
   orchestration/logs/ を .gitignore に追加する。
   TASK.md、PROGRESS.md、prompts/、AGENTS.md はコミット対象にする。
   初期の作業方針と進捗ファイルを commit・push してから反復を始める。

各反復：
1. TASK.md と PROGRESS.md を読み、30 分以内を目安に終えられる作業を一つ選ぶ。
2. 目的、編集範囲、完了条件、検証コマンドを orchestration/prompts/iter_NNN.md に書く。
   Codex には実装とテストを任せ、commit・push はさせない。
3. リポジトリのルートで以下を実行する（NNN は反復番号に置き換える）。

   sh run_codex.sh exec --sandbox workspace-write \
     -C "$(git rev-parse --show-toplevel)" \
     -o orchestration/logs/iter_NNN_last.md \
     - < orchestration/prompts/iter_NNN.md \
     > orchestration/logs/iter_NNN.log 2>&1

   長い処理はバックグラウンドで実行し、ログと終了コードを確認する。
   Codex が終了してから次へ進み、同じクローンで複数の実装を同時に走らせない。
4. あなた自身が差分を読み、テストと完了条件を確認する。
   不合格なら具体的な修正指示を出す。同じ作業の修正は 3 回まで。
   解決しなければ git stash push -u -m "iter NNN failed" で変更を保存する。
5. PROGRESS.md に反復番号、作業内容、検証結果、次の一手を記録する。
   合格した変更と進捗を commit し、git push origin LLM を実行する。
   不合格の作業も進捗に記録し、その記録を commit・push する。
6. 私に 1〜2 行で進捗を報告して、次の反復へ進む。

停止条件：完了条件の達成、3 反復続けて前進なし、週間上限などの
usage limit 系エラー、認証エラー、継続する通信エラー、
または人間の判断が必要な方針変更。API キー認証へ切り替えて続行しない。
停止時は理由を PROGRESS.md に残す。
```

接続部分は `run_codex.sh` 経由の [`codex exec`](https://developers.openai.com/codex/noninteractive/) の呼び出しだけ。`-` で指示を標準入力から渡し、`-C` で作業場所、`-o` で最終回答の保存先を指定する（[CLI リファレンス](https://developers.openai.com/codex/cli/reference/)）。

進捗は `LLM` のコミット履歴と `orchestration/PROGRESS.md` で確認する。止めるときは Claude に「次の反復が終わったら止めて」と伝える。新しいセッションでは `orchestration/TASK.md` と `orchestration/PROGRESS.md` を読ませて再開する。
