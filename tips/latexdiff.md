---

title: '快適な latexdiff 生活'
date: '2024-02-24'
description: 'latexdiff の使用法に関する tips'
image: 'LaTeX_project_logo_bird.svg'

---

Logo by <a href="https://latex-project.org/" target="_blank">The LaTeX Project</a>

## テンプレート

``` shell
latexdiff-vc -e utf8 --exclude-textcmd="section,subsection,subsubsection" --git --flatten --force -d diff -r (commit / HEAD) (filename)
```

さらに、このコマンドで生成される latex ソースファイルは元のソースファイルと別の場所におかれるため、図やスタイルファイルのパスを通しておく必要がある。
図については以下のようなコマンドでパスを通す。

``` latex
\graphicspath{{../}}
```

スタイルファイルはあらかじめインストールしておくのが吉。`.sty` のインストール手順は

``` shell
kpsewhich -var-value TEXMF
```

で規定の置き場所を特定した後（今回は `/usr/local/texlive/2023/texmf-dist` を選択）、スタイルファイルを置くためのフォルダの作成、スタイルファイルの配置、リストの更新を行う。例として `jhephub.sty` を置いた際の作業は

``` shell
cd /usr/local/texlive/2023/texmf-dist/tex/latex
sudo mkdir jhephub
sudo cp **/jhephub.sty jhephub/
sudo mktexlsr
```

`.bst` のインストール手順も同様で

```shell
kpsewhich -var-value BSTINPUTS
cd /usr/local/texlive/2023/texmf-dist/bibtex/bst
sudo mkdir jhep
sudo cp **/jhep.bst jhep/
sudo mktexlsr
```

### git との連携

いつも https://nekketsuuu.github.io/entries/2017/01/27/latexdiff-vc.html を参考にしている。

``` shell
latexdiff-vc -e utf8 --git --flatten --force -d diff -r (commit / HEAD) (filename)
```

### Section 変更時のタイプセットエラーを避ける

オプション `--exclude-textcmd="section,subsection,subsubsection"` で、section の変更、追加等を無視してくれる。

### 複雑な数式を変更した際のエラーを避ける

オプション `--math-markup=whole` で、変更のある数式は全体を色付けする対応をとる。これでもエラーが避けられない場合もあり、数式の変更点を諦めても良いなら `--math-markup=off` が使える。

## タイプセットエラーのケーススタディー

### Argument of \trigbraces has an extra }

このエラーを含む多くのエラーが `\DIFdel{}` および `\DIFadd{}` セクションを含む行に発生した。全く理由がわかっていないのだが、エラーの発生源は

``` latex
\sin(m_a t + \varphi)
```

という記述であることが特定され、代わりに

``` latex
\sin(m_at+\varphi)
```

と原理的には不要なスペースを削ることでタイプセットが通るようになった。

### Option clash for package ulem

元の原稿で `ulem` パッケージを使用していると、latexdiff が追加する `ulem` のオプションと衝突してこのエラーが出る。
元の原稿由来の `\usepackage{ulem}` をコメントアウトするのが手っ取り早い対策法。
