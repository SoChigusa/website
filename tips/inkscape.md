---

title: 'Inkscape でお絵かき'
date: '2023-12-30'
description: 'フリーソフトの Inkscape を用いたイラスト作成に関する tips'
image: 'Inkscape_Logo.svg'

---

Logo by <a href="https://inkscape.org/" target="_blank">Inkscape</a>

## はじめに

Inkscape はフリーのドローソフトの最高峰である（自分比）。
知名度の高さから多くのextensionも用意されており、その中の一つである`TexText`を用いることで、LaTeX形式で入力した数式を図に書き込むこともできる。

**（2020/12/11追記）**
以前は`EqTeXSVG`を使っていたが、python3のサポートがなされておらず面倒だったので`TexText`に乗り換えた。
以下には念のため両方の導入法を残しておく。

## インストール for Mac

アプリケーションディレクトリに放り込むだけのインストール方法も可能だが、extensionフォルダの場所がわからなかったので、`homebrew`で入れ直した。

```shell
brew install inkscape
```

## TexTextの導入

他に要求されたパッケージもないため導入は非常に楽で、[公式サイトの記述](https://textext.github.io/textext/install/macos.html)に従うだけ。

1. [ここ](zip-file for MacOS)から最新版のパッケージをダウンロードする
2. 展開したファイルのパスで、以下のコマンドを実行してインストール

```shell
python3 setup.py --pdflatex-executable=$(which pdflatex) --skip-requirements-check
```

### 数式のプロット

メニューの`Extensions > Text > TexText`から。

## （古い情報）EqTeXSVGの導入

前準備として`pstoedit`が必要になるのでインストール。

```shell
brew install pstoedit
```

これでパスも通っているはず。`EqTeXSVG`の[公式サイト](https://www.julienvitard.eu/en/eqtexsvg_en.html)にある通り、extensionのファイルをcloneしてきてextensionフォルダにコピーする。

```shell
git clone https://github.com/julienvitard/eqtexsvg.git
cp eqtexsvg/eqtexsvg.* ~/.config/inkscape/extensions/
```

~~extensionフォルダの場所が非自明だったが、~~ 自分の環境では[このページ](https://tesselace.com/2017/10/31/inkscape-on-mac-os-x/)の情報と同じだった。
動かしたいときは、Inkscapeのメニューの`Extensions>Render>LaTeX formula`から。

### 数式のプロット

まず、数式をプロットしたい矩形領域を書いておく。
領域を選択して、メニューの`Extensions>Render>Function Plotter...`を開いて色々設定できる。
