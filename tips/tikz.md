---

title: 'TikZ でお絵かき'
date: '2024-05-06'
description: 'TikZ を用いた LaTeX 上でのイラスト作成に関する tips'
image: 'LaTeX_project_logo_bird.svg'

---

## TikZ ライブラリの追加

**症例:** `texlive` のバージョンの問題なのか、量子回路を描くための `quantikz2` ライブラリがインストールされていなかった（`quantikz` ライブラリは見つかった）。

**対処法:** [StackExchange](https://tex.stackexchange.com/questions/187193/how-to-install-tikz-pgf-libraries) の解法に従って、`texmf` の場所を

```shell
tlmgr conf texmf TEXMFHOME
```

として確認。
手元の環境では `~/Library/texmf` が返ってきたので、つづけて

```shell
mkdir -p ~/Library/texmf/tex/latex/quantikz/
```

（ただし、`tex/latex/quantikz` の部分は `quantikz` ライブラリの場所を参考に決めた）として、CTAN で参照できる [quantikz パッケージ](https://ctan.org/pkg/quantikz) の中身を上記のディレクトリ内に置く。
この操作により、ライブラリのロード操作

```latex
\usetikzlibrary{quantikz2}
```

がエラーを吐かなくなった。

## 量子回路を描く

[quantikz パッケージ](https://ctan.org/pkg/quantikz)を使用する。
便利になんでも描けるのだが、いかんせん CUI ベースでイラストを描くのは間違いが発生しやすくて面倒である。
（TikZ のコンセプトに反しているような気もするが）GUI でサポートできるアプリケーションがあれば便利そうなので作ろうかと考えている。
