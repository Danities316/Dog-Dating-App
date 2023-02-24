const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const stylesHandler = 'style-loader';

module.exports = {
  entry: './client/src/index.js',
    output: {
        path: path.resolve(__dirname, './client/dist'),
        filename: 'bundle.js'
    },
    mode: 'development',
    module:  {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: "defaults" }],
                  '@babel/react'
                   
                ]
              }
            }
          },
            {
              test:  /\.s[ac]ss$/i,
              use: [stylesHandler, 'css-loader', 'sass-loader'],
            },
      //       {
      //   test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
      //   type: 'asset',
      // },
          {
            test: /\.(png|jpe?g|gif)$/i,
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ]
      },
      
      devServer: {
        static: {
          directory: path.resolve(__dirname, './dist'),
        },
        historyApiFallback: {
          rewrites: [
            { from: /^\/app/, to: 'client\src\index.html' }
          ],
        },
        compress: true,
        port: 9000,
      },
      plugins: [
        new webpack.ProvidePlugin({
           "React": "react",
        }),
  
     ],
     
}