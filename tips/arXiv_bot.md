---

title: 'arXiv API + Slack API + ChatGPT で arXiv bot を作る'
date: '2023-04-12'
description: 'arXiv API + Slack API + ChatGPT の組み合わせで arXiv bot を構成した際の tips'
image: 'ArXiv_logo_2022.png'

---

## やったこと

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">真似して bot 導入させてもらいました！　arXiv 嫌いを克服するために n 年ぶり 2 度目の bot 活用。<br>元のコードから<br>・search query を cat:het-ph に<br>・本日付の論文を全て表示<br>と変更し、いくつか躓いて時間を食っても 2 時間ちょいで実装完了。オススメです。あとで躓いた点をまとめます。 <a href="https://t.co/4QTnYcdmyC">https://t.co/4QTnYcdmyC</a></p>&mdash; So Chigusa (@SoChigusa) <a href="https://twitter.com/SoChigusa/status/1645758601708048387?ref_src=twsrc%5Etfw">April 11, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

最新の論文の情報を ChatGPT を用いて要約し、Slack に投げてくれる素敵な bot の作り方が紹介されていたのでやってみた。
基本的には[ここ](https://zenn.dev/ozushi/articles/ebe3f47bf50a86)に紹介されている通りだが、個人的なニーズに合わせて

- 取得対象は hep-ph のカテゴリの論文
- その日に出た論文全ての情報をまとめて要約
- 著者の情報も出力
  
という構成にしたかったので、いくつか変更を加えた。
以下に躓いた点と今後の改善点をまとめておく。

## 躓いた点のまとめ

### bot が "error": "not_in_channel" を吐く

僕の環境では、アプリを Slack ワークスペースに追加したのち、bot を対象のチャンネルに招待してやる必要があった。
[ここ](https://stackoverflow.com/questions/60198159/slack-api-conversations-history-returns-error-not-in-channel)の記述に従って、チャンネル内のチャットボックスで

``` shell
/invite @BOT_NAME
```

とする。

### arXiv API の使い方

特に、個人的なニーズに合わせた変更を行うために、search query の書き方だけは調べる必要があった。
[ここ](https://info.arxiv.org/help/api/basics.html)から情報を読み取る。
ページの中程に書いてあるように

``` shell
http://export.arxiv.org/api/query?search_query=SEARCH_QUERY
```

の形で出力を確認できるので、トライアル＆エラーで query を構成していく。

ソースコード上の変更点としては、以下の通り。

> 取得対象は hep-ph のカテゴリの論文

``` python
# queryを用意
query = 'cat:hep-ph'
```

> その日に出た論文全ての情報をまとめて要約

``` python
# searchの結果のうち当日の submission 分をリストに格納
d_today = datetime.date.today()
result_list = []
for result in search.results():
  if(d_today == result.published.date()):
    result_list.append(result)
```

> 著者の情報も出力

``` python
def get_summary(result):
  ...
  authors = [str(a) for a in result.authors]
  authors_str = ', '.join(authors)
```

### MissingTargetException

Google Cloud Functions のデプロイ時に発生するエラー。
[ここ](https://tkstock.site/2021/10/25/gcp-google-cloudfunction-deploy-missingtargetexception/)の記述通り、エントリーポイントというのが実行する関数名なので、ソースコード内の関数名とコンシステントにしておく。

### タイムゾーンの設定

「本日分の論文の情報だけを取得」という構成にしたせいで、arXiv の更新時間と自作のソースコードが実行される時間との間に齟齬がないように調整する必要がある。
設定を間違えるとソースコードの実行時間が常に arXiv の最新の投稿時間の次の日になったりして、結果が返ってこない。

Google Cloud Functions のタイムゾーンの設定は[ここ](https://blog.turai.work/entry/20190417/1555510726)を参考に、環境変数に `TZ=	US/Pacific` を加えた。
このタイムゾーンの指定の仕方は、IANA Time Zone Database というもののフォーマットらしい。
この設定を行なった上で Cloud scheduler の設定は `0 21 * * *` とすることで、毎日 9pm PST に新着論文の情報が通知されるようになった。

## 改善したい点

### Google Cloud Functions のタイムアウト

GCP に頼る場合、最大タイムアウト時間が 540 秒である。
これは論文数本を処理する程度ならば気にならないが、hep-ph の新着論文（日によっては 2,30 本出る）を全て処理する場合、ChatGPT のレスポンスの遅さのせいでタイムアウトしてしまうようである。
考えられる対処法としては、

- 処理を分割する
- 最大タイムアウト時間がもっと長いサーバーレスサービス

### ChatGPT のプロンプト

この方法の最も魅力的な部分は、自然言語を用いたプロンプトで出力フォーマットを自在にカスタマイズできる点であろう。

- ChatGPT の効率的な『調教』方法を学ぶ
