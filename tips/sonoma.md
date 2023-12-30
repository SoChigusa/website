---

title: 'macOS Sonoma クリーンインストール'
date: '2023-12-31'
description: 'macOS Sonoma をクリーンインストールした際の tips'
image: 'Apple_logo_black.svg'

---

## 序説

[3年前に購入した Macbook Air](macbookair2020) の動作がかなりもっさりしてきたので、しばらく様子見をしていた OS アップデートを兼ねてクリーンインストールを敢行した。
サクサクと動作するようになって今のところ快適である。
本記事はその作業の流れと最中に生じた問題をまとめた備忘録である。

OS のインストールが完了した後、基本的な設定の流れは [mac mini の記事](macmini2022)と同様である。

## クリーンインストール

どこのウェブサイトを覗いても書いてあるような手順で行う。

1. Time Machine を使ってバックアップを取る
2. OS アップデート
3. 「mac を探す」をオフにしておく
4. リカバリーモードで mac を起動
5. ディスクユーティリティから起動ディスクを削除
6. OS を再インストール

どうも m1 mac になってからリカバリーモードでの起動方法が変わったらしい。
`Cmd+R` 長押しではなく電源ボタンの長押しでリカバリーモードに入るようになったので注意。

## 環境構築

### 汎用設定

英語をデフォルト言語にして設定を開始すると、日本語が中国語フォントで表示されるという不具合に遭遇した。
System Preferences > Language & Region > Preferred Languages から、日本語を設定に追加することで修正完了。
さらに、念のため以下のコマンドでフォントキャッシュを消去しておく。

```shell
sudo atsutil databases -remove
```

自分好みの設定はこれに加えて

- 日本語入力メニューから、ライブ変換をオフ
- キー長押しによる連続入力を快適にするため、System settings > Keyboard 内の 2つのスライダーをどちらも最速に設定。

### ワイヤレスキーボード、トラックパッド、マウスの接続

logicool 製のマウスを使用しているので [Logicool Options](https://www.logicool.co.jp/ja-jp/product/options) をインストール。

### Xcode

App Storeからインストールする。
その後、以下の通り Command Line tools をインストール。

``` shell
xcode-select --install
```

### Github

Github ウェブサイト内の Settings / Developer Settings / Personal access tokens からトークンを発行してターミナルに Github ログイン情報を覚えさせる。
アクティブプロジェクトのリポジトリを全て `git pull` しておく。

### VSCode

[公式サイト](https://code.visualstudio.com/)からダウンロードしてインストール、動く。

Github のアカウントと連携して設定を同期するために、左下の「設定＞設定の同期をオンにする」で Github を選択し、ログインする。

### Python バージョン管理

[公式サイト](https://github.com/conda-forge/miniforge?tab=readme-ov-file#download)から Miniforge をダウンロードしてインストール。問題なく動く。

### Web 開発関連

Node.js を[公式サイト](https://nodejs.org/)からダウンロード、動く。

開発中のウェブサイトのディレクトリに移動して、dependencies のインストールをしておく。

```shell
npm install
```

プロジェクト内の環境変数 `(Project Directory)/.env.local` は（当然）Github を通じて同期できないので、必ずバックアップから復元する。

### Homebrew

[公式サイト](https://brew.sh/index_ja)の言うとおり、

``` shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

でインストールできる。

### Homebrewを使ってインストールするもの

``` shell
brew install root
brew install mactex-no-gui --cask
brew install inkscape
```

- `root v6.30/02` をインストール。問題なく動く。
- MacTeX no GUI をインストール。問題なし。
- Inkscape の設定は[このページ](inkscape.html)を参照して行う。

### Madgraph

[公式サイト](https://launchpad.net/mg5amcnlo)から最新版の `v3.5.3` をダウンロードして、[ここ](madgraph)にまとめた通りの手順でセットアップを試みる。

`install lhapdf6` が正常に終了しておらず、`lhapdf-config` 等の実行ファイルが生成されていなかったので、[Systematics Module](madgraph#20180819-systematics-module-を使う) の節の記述に従って手動でインストールし、パスも通しておく。
こうすることで初めて `pythia8` のインストールを完了することができ、無事に動くことを確認。

### SNS

* [Zoom](https://zoom.us/download)をインストール、動く。
* [Skype](https://www.skype.com/ja/get-skype/)をインストール、動く。
* [Slack](https://slack.com/downloads/mac)をインストール、動く。
* [Zulip](https://zulip.com/)をインストール、動く。
* [Mattermost](https://mattermost.com/apps/)をインストール、動く。

### その他便利ツール

* [DeepL](https://www.deepl.com/app)、動く。
* [Grammarly](https://www.grammarly.com/desktop/mac)、動く。
* [TeamViewer](https://www.teamviewer.com/ja/)、`TeamViewer Full Client` を選択してインストール。動く。
