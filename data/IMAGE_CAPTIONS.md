# 「画像で一言」の更新方法

1. 画像を `public/image-captions/` に保存します。
2. `data/image-captions.json` の末尾に、次の形式の項目を追加します。

```json
[
  {
    "fileName": "example.jpg",
    "alt": {
      "ja": "画像の内容を説明する日本語テキスト",
      "en": "English text describing the image"
    },
    "comment": {
      "ja": "日本語の一言コメント",
      "en": "A short comment in English"
    }
  }
]
```

- `fileName` にはディレクトリ名を含めず、画像のファイル名だけを指定します。
- `alt` には画像の内容を説明する代替テキストを、日本語と英語で指定します。
- 代替テキストとコメントは、日本語・英語のどちらも必須です。
- ページには JSON の逆順（末尾の項目から先）で表示されます。
- JSON に存在しない画像は表示されません。存在しない画像を JSON で指定すると、ビルド時にエラーになります。
