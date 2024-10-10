// Generated using webpack-cli https://github.com/webpack/webpack-cli

const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = 'style-loader';

const config = {
  entry: Path.join(__dirname, '/client/src/index.jsx'),
  output: {
    path: Path.join(__dirname, '/client/dist'),
    filename: 'bundle.js',
  },
  devServer: {
    open: true,
    host: 'localhost',
  },
  plugins: [
    //add plugins here
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
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: miniCssExtractPlugin.loader,
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader',
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [autoprefixer],
              },
            },
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(js|jsx)$/i,
        exclude: /nodeModules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(ico|svg|png|jpg|jpeg|gif)$/i,
        type: 'asset',
        use: ['file-loader'],
      },
      {
        test: /\.(ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }
  return config;
};
