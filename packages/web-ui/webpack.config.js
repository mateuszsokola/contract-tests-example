const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const webpack = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'target'),
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.css', '.scss'],
  },
  devServer: {
    contentBase: false,
    compress: true,
    port: 9000
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }, {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader'
          ]
        }))
      }, {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'static/fonts/[hash].[ext]',
            limit: 5000,
            mimetype: 'application/font-woff'
          }
        }
      }, {
        test: /\.(ttf|eot|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'static/fonts/[hash].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html'
    })
  ]
}

module.exports = webpack