// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = 'style-loader';

const config = {
    entry: path.join(__dirname, "/client/src/index.jsx"),
    output: {
        path: path.join(__dirname, "/client/dist"),
        filename: "bundle.js",
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        //add plugins here
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                exclude: /nodeModules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
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
