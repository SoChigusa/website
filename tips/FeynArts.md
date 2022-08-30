---

title: 'FeynArts, FormCalc, LoopTools の導入'
date: '2020-01-05'
description: 'Feyn*** ツール群のインストールに関する tips'
image: 'Mathematica_Logo'

---

## インストール ##

http://www.feynarts.de を見て、用意されているシェルスクリプト`FeynInstall`を用いて
全てのコードをインストールする。質問にイエス連打していれば`$PATH`の設定までしてくれるはずが、
今回は上手くいかなかったので、手動で設定する。`~/Library/Mathemtica/Kernel/init.m`をエディタで開いて

``` Mathematica
$Path = Join[{ToFileName[$HomeDirectory, "FeynArts"],
              ToFileName[$HomeDirectory, "FormCalc"]}, $Path]
```

を追加する。ただし、例は`FeynInstall`をホームディレクトリで動かした場合に対応する。
