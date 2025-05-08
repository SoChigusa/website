const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  //...
  webpack: (config) => {
    config.module.rules.push({
      test: /\.pdf$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'public/[name].[ext]',
          },
        },
      ],
    });

    config.plugins.push(
      new CopyPlugin({
        patterns: [
          { from: 'research/cv.pdf', to: 'public/cv.pdf' },
          { from: 'research/cv.pdf', to: 'public/ja/cv.pdf' },
        ],
      }),
    );

    return config;
  },
  i18n: {
    locales: ['en', 'ja'],
    defaultLocale: 'en',
  },
}
