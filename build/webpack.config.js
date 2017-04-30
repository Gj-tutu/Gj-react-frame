const webpack = require('webpack')
const cssnano = require('cssnano')
const pxtorem = require('postcss-pxtorem')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackMd5Hash = require('webpack-md5-hash');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('../config')
const debug = require('debug')('app:webpack:config')
const glob = require('glob')

const paths = config.utils_paths
const __DEV__ = config.globals.__DEV__
const __APP__ = config.globals.__APP__
const __PROD__ = config.globals.__PROD__
const __TEST__ = config.globals.__TEST__

// 区分app路径，app需要相对路径
function compiler_public_path () {
  if (config.app) return './'
  return config.compiler_public_path
}
// 区分app静态文件保存格式，app不需要hash等文件名处理
function fileNameFormat (type, ext) {
  ext = ext || '[ext]'
  return config.app ? `[name].${ext}` : `src/[name].[${type}].${ext}`
}

debug('Creating configuration.')
const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: config.compiler_devtool,
  resolve: {
    root: paths.client(),
    extensions: ['', '.web.js', '.js', '.jsx', '.json']
  },
  module: {}
}
// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY = paths.client('main.js')

webpackConfig.entry = {
  app: (__DEV__ && !__APP__)
    ? [APP_ENTRY].concat(`webpack-hot-middleware/client?path=${compiler_public_path()}__webpack_hmr`)
    : [APP_ENTRY],
  vendor: config.compiler_vendors
}

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
  filename: fileNameFormat(config.compiler_hash_type, 'js'),
  path: paths.tmp(),
  publicPath: compiler_public_path(),
  chunkFilename: fileNameFormat(config.compiler_hash_type, 'js')
}

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
  new webpack.DefinePlugin(config.globals),
  new HtmlWebpackPlugin({
    template: paths.client('index.html'),
    hash: false,
    favicon: paths.client('static/favicon.ico'),
    filename: 'index.html',
    inject: 'body',
    minify: {
      collapseWhitespace: true
    },
    globals: config.globals
  })
]

if (__DEV__ && !__APP__) {
  debug('Enable plugins for live development (HMR, NoErrors).')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
} else if (__PROD__ || __TEST__) {
  debug('Enable plugins for production (OccurenceOrder, Dedupe & UglifyJS).')
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  )
  if (__PROD__) {
    webpackConfig.plugins.push(
      new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor'],
        minChunks: function (module, count) {
          // any required modules inside node_modules are extracted to vendor
          return (
            module.resource &&
            /\.js$/.test(module.resource) &&
            module.resource.indexOf(
              path.join(__dirname, '../node_modules')
            ) === 0
          )
        }
      }),
      // extract webpack runtime and module manifest to its own file in order to
      // prevent vendor hash from being updated whenever app bundle is updated
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'manifest',
      //   chunks: ['vendor']
      // }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new ExtractTextPlugin(fileNameFormat(config.compiler_hash_type, 'css'), {
        allChunks: true
      })
      // new WebpackMd5Hash()
    )
  }
}

const svgDirs = [] // 如果需要本地部署图标，需要在此加入本地图标路径，本地部署方式见以下文档
// 把`antd-mobile/lib`目录下的 svg 文件加入进来，给 svg-sprite-loader 插件处理
glob.sync('node_modules/**/*antd-mobile/lib', { dot: true }).forEach(p => {
  svgDirs.push(new RegExp(p))
})
// ------------------------------------
// Loaders
// ------------------------------------
// File loaders
// JavaScript / JSON
webpackConfig.module.loaders = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel',
    query: config.compiler_babel
  },
  {
    test: /\.json$/,
    loader: 'json'
  },
  // ...
  // 注意：如果有其他 svg loader 设置，请 exclude 掉这里的 svgDirs 目录。
  // 少数情况下，如果你的项目能预见到所有 svg 图标都需要 svg-sprite 处理，你可以不设置 include ，也即不需要枚举 svg 文件路径
  { test: /\.svg$/, loader: 'svg-sprite', include: svgDirs },
  {
    test: /\.(svg)(\?.*)?$/,
    include: paths.client(),
    loader: 'url',
    query: {
      limit: 10240,
      name: fileNameFormat('hash')
    }
  },
  {
    test: /\.(png|jpe?g|gif)(\?.*)?$/,
    loader: 'url',
    query: {
      limit: 10240,
      name: fileNameFormat('hash')
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url',
    query: {
      limit: 10240,
      name: fileNameFormat('hash')
    }
  }
]

function loaderAnalysis (loaders) {
  if (__PROD__) {
    return ExtractTextPlugin.extract(loaders.shift(), loaders.join('!'))
  }
  return loaders.join('!')
}

// ------------------------------------
// Style Loaders
// ------------------------------------
// We use cssnano with the postcss loader, so we tell
// css-loader not to duplicate minimization.
webpackConfig.module.loaders.push({
  test: /\.less$/,
  exclude: null,
  loader: loaderAnalysis(['style-loader', 'css-loader', 'postcss-loader', 'less-loader'])
})

webpackConfig.module.loaders.push({
  test: /\.css$/,
  exclude: null,
  loader: loaderAnalysis(['style-loader', 'css-loader', 'postcss-loader'])
})

webpackConfig.postcss = [
  cssnano({
    autoprefixer: {
      add: true,
      browsers: ['last 5 versions']
    },
    discardComments: {
      removeAll: true
    },
    discardUnused: false,
    mergeIdents: false,
    reduceIdents: false,
    safe: true,
    sourcemap: true
  }),
  pxtorem({
    rootValue: 100,
    propWhiteList: []
  })
]
/* eslint-disable */

/* eslint-enable */

// ------------------------------------
// Finalize Configuration
// ------------------------------------

module.exports = webpackConfig
