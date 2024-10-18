const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';

const config = {
  entry: Path.join(__dirname, '/client/src/index.jsx'),
  devtool: isProduction ? 'source-map' : 'eval-source-map',
  output: {
    path: Path.join(__dirname, '/client/dist'),
    filename: 'bundle.js',
    devtoolModuleFilenameTemplate: info => Path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: Path.join(__dirname, 'client/src/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new webpack.ProgressPlugin(),
    !isProduction && new webpack.HotModuleReplacementPlugin()
  ].filter(Boolean),
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
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(ico|svg|png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext][query]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  devServer: {
    static: {
      directory: Path.join(__dirname, 'client/dist'),
    },
    compress: true,
    port: 3000,
    hot: true,
    open: true,
    client: {
      overlay: {
        warnings: false,
        errors: true,
      },
    },
  },
  ignoreWarnings: [
    {
      message: /deprecation warning/i,
    },
  ],
};

module.exports = () => {
  config.mode = isProduction ? 'production' : 'development';
  return config;
};
