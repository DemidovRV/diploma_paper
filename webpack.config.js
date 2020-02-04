const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    entry: {
      main: './src/pages/scripts/index.js',
        analytics: './src/pages/scripts/analytics.js',
        about: './src/pages/scripts/about.js'
    },
    output: { // Точка выхода
        path: path.resolve(__dirname, 'dist'),
        filename: './[name]/[name].[chunkhash].js'
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
            use: [
              (isDev ? 'style-loader' : {
              loader: MiniCssExtractPlugin.loader,
              options: {
                  publicPath: './'
              }
            }),
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
            filename: './[name]/[name].[contenthash].css'
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
          inject: false,
          template: './src/index.html',
          filename: 'index.html'
      }),
      new HtmlWebpackPlugin({
          inject: false,
          template: './src/about.html',
          filename: 'about.html'
      }),
      new HtmlWebpackPlugin({
          inject: false,
          template: './src/analytics.html',
          filename: 'analytics.html'
      }),
        new WebpackMd5Hash(),
        new webpack.DefinePlugin({
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
         })
    ]
}
