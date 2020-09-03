module.exports = {
  entry: './client/index.jsx',
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/public`,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['url-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './font/[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
  watchOptions: {
    ignored: 'node_modules/**',
  },
};
