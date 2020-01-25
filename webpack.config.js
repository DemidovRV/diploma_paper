const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    entry: {
      main: './src/index.js' //Точка входа
    },
    output: { // Точка выхода
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
      rules: [{
          test: /\.js$/,

          use: {
              loader: 'babel-loader'  // Весь JS обрабатывается пакетом babel-loader
              },
              exclude: /node_modules/ // Исключаем папку node_modules
          },
          {
            test: /\.css$/,
            use: [(isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
            'css-loader',
            'postcss-loader']
          },
          {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
                {
                    loader: 'file-loader',
                },
            ],
        },
        {
            test: /\.(png|jpg|gif|ico|svg)$/,
            use: [
                'file-loader?name=./images/[name].[ext]',
                {
                    loader: 'image-webpack-loader',
                    options: {}
                },
            ]
        },
        {
            test: /\.(eot|ttf|woff|woff2)$/,
            loader: 'file-loader?name=./vendor/[name].[ext]'
        }
          ]
      },
      devServer: {
        contentBase: path.join(__dirname, 'dist'),
    },
      plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css'
        }),
        new OptimizeCssAssetsPlugin({
          assetNameRegExp: /\.css$/g,
          cssProcessor: require('cssnano'),
          cssProcessorPluginOptions: {
                  preset: ['default'],
          },
          canPrint: true
     }),
        new HtmlWebpackPlugin({
          // Означает, что:
          inject: false, // стили НЕ нужно прописывать внутри тегов
          template: './src/index.html', // откуда брать образец для сравнения с текущим видом проекта
          filename: 'index.html' // имя выходного файла, то есть того, что окажется в папке dist после сборки
        }),
        new WebpackMd5Hash(),
        new webpack.DefinePlugin({
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
         })
    ]
}
