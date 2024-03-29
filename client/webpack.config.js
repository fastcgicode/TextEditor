const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [new InjectManifest({
      swSrc: './src-sw.js',
    }),
      new HtmlWebpackPlugin({
        title: 'TextEditor PWA',
        template: "index.html",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'src'),
          exclude: /(node_modules|bower_components|build)/,
          loader: 'babel-loader'
        },
        {
          test: /\.(css|less)$/,
          use: ["style-loader", "css-loader"]
        }
      ]
    },
  };
};
