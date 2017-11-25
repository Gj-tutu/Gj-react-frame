const webpack = require('webpack')
const config = require('../config')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const paths = config.utils_paths

const vendors = [
  'fastclick',
  'moment',
  'promise',
  'react-addons-css-transition-group',
  'react-redux',
  'redbox-react',
  'redux',
  'redux-thunk',
  'superagent',
  'url',
  'react',
  'react-dom',
  'react-router'
]
console.log(paths.lib('*'))
module.exports = {
  output: {
    filename: '[name]_[hash].js',
    path: paths.lib(),
    library: '[name]_[hash]'
  },
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json']
  },
  entry: {
    'lib': vendors
  },
  plugins: [
    new CleanWebpackPlugin([paths.lib('*')]),
    new webpack.ProgressPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DllPlugin({
      path: paths.lib('manifest.json'),
      name: '[name]_[hash]',
      context: paths.lib()
    })
  ]
}
