---

title: 'Overleaf 上で cross reference'
date: '2025-12-06'
description: '複数ファイルにまたがる latex ソースの Overleaf 上でのコンパイルに奮闘した記録'
image: 'Overleaf_Logo.svg'

---

## やりたいこと、直面した問題

投稿先の雑誌の要請に応じて、論文の本文と補遺（いわゆる Supplemental Material）とを分ける必要があったりする。
こんなとき、本文中の数式や図を補遺中で引用したり、その逆をやったりするやり方がわからなくて調べた。
基本的には

``` latex
\usepackage{xr}
\externaldocument{<filename>}
```

で `<filename>.aux` 内に定義されたラベルにアクセスできるようになるのだが、Overleaf 上で作業していると `.aux` ファイルが生成されない（少なくともそんな風に見える）ので困った。

## 解決策

Overleaf 上でのコンパイル作業をハックするために、プロジェクトのヘッダーに `latexmkrc` を置く方法があるらしい。
`xr` パッケージを使用するための使い方は[公式サイト](https://www.overleaf.com/learn/how-to/Cross_referencing_with_the_xr_package_in_Overleaf)にも記述がある。
今回は以下のような `latexmkrc` で作業を進めた。

``` perl
# latexmkrc -- make xr work on Overleaf

# 外部ドキュメントのコンパイル成果物を入れるサブディレクトリ
$sub_doc_output = 'output-subdoc';

# 外部ドキュメント用の latexmk オプション
@sub_doc_options = ();
push @sub_doc_options, '-pdf';  # 必要なら -pdfdvi や -pdflatex に変更

# xr の「No file XXX.aux」メッセージを拾って、XXX.tex → XXX.aux を作るカスタム依存関係
push @file_not_found, '^No file\\s*(.+)\s*$';
add_cus_dep('tex', 'aux', 0, 'makeexternaldocument');

sub makeexternaldocument {
    if ( $root_filename ne $_[0] ) {
        my ($base_name, $path) = fileparse( $_[0] );
        pushd $path;
        my $return = system "latexmk",
                            @sub_doc_options,
                            "-aux-directory=$sub_doc_output",
                            "-output-directory=$sub_doc_output",
                            $base_name;
        # 生成された .aux を元のディレクトリにコピー
        if ( ($sub_doc_output ne '') && ($sub_doc_output ne '.') ) {
            rdb_add_generated("$sub_doc_output/$base_name.aux");
            copy("$sub_doc_output/$base_name.aux", ".");
        }
        popd;
        return $return;
    }
}
```

ちなみに、これら一連の解決方法はいつも通り ChatGPT とケンカしながら導いた。
ケンカの記録は[こちら](https://chatgpt.com/share/6934a447-abac-8002-80e1-0a7c4e3836da)
