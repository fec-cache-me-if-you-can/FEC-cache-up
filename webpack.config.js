const Path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production', // 1. Set mode to 'production'
  entry: Path.join(__dirname, '/client/src/index.jsx'),
  output: {
    path: Path.join(__dirname, '/client/dist'),
    filename: '[name].[contenthash].js', // 2. Use content hashing in filenames
    clean: true, // Clean the output directory before each build
  },
  devtool: 'source-map', // Generate source maps for debugging
  plugins: [
    new HtmlWebpackPlugin({
      template: Path.join(__dirname, 'client/src/index.html'),
      minify: { // 6. Minify HTML output
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({ // 3. Extract CSS into separate files
      filename: '[name].[contenthash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-syntax-dynamic-import',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // Use MiniCssExtractPlugin.loader
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'], // Use MiniCssExtractPlugin.loader
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset',
      },
    ],
  },
  optimization: {
    minimize: true, // 4. Enable minimization
    minimizer: [
      new TerserPlugin({ // 4. Minify JavaScript
        terserOptions: {
          compress: {
            drop_console: true, // Remove console logs
          },
        },
      }),
      new CssMinimizerPlugin(), // 4. Minify CSS
    ],
    splitChunks: { // 5. Enable code splitting
      chunks: 'all',
    },
    runtimeChunk: 'single',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': Path.resolve(__dirname, 'client/src/'),
    },
  },
  cache: {
    type: 'filesystem',
  },
  stats: {
    errors: true,
    warnings: false,
    modules: false,
    performance: true,
  },
};
