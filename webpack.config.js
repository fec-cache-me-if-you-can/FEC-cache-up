// Generated using webpack-cli https://github.com/webpack/webpack-cli

const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV == 'production';

const config = {
  entry: Path.join(__dirname, '/client/src/index.jsx'),
  output: {
    path: Path.join(__dirname, '/client/dist'),
    filename: 'bundle.js',
    clean: true, // Ensure the output directory is cleaned before each build
  },
  devServer: {
    open: true,
    host: 'localhost',
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: Path.join(__dirname, 'client/src/index.html'),
    }),
    new miniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [autoprefixer],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(ico|svg|png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

module.exports = () => {
  config.mode = isProduction ? 'production' : 'development';
  if (!isProduction) {
    config.devtool = 'source-map';
  }
  return config;
};
