const webpack = require('webpack')
const cssnano = require('cssnano')
const pxtorem = require('postcss-pxtorem')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('../config')
const debug = require('debug')('app:webpack:config')
const fs = require('fs')
const paths = config.utils_paths
const __DEV__ = config.globals.__DEV__
const __PROD__ = config.globals.__PROD__

function fileNameFormat(type, ext) {
  ext = ext || '[ext]'
  return `src/[name].[${type}].${ext}`
}
debug('Creating configuration.')
const webpackConfig = {
  name: 'client',
  target: 'web',
  cache: true,
  devtool: 'eval',
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json']
  },
  module: {}
}

const APP_ENTRY = paths.client('main.js')
webpackConfig.entry = {
  app: (__DEV__) ? [APP_ENTRY].concat(`webpack-hot-middleware/client?path=${config.public_path}__webpack_hmr`) : [APP_ENTRY]
}

webpackConfig.stats = 'none'

webpackConfig.output = {
  filename: fileNameFormat(config.compiler_hash_type, 'js'),
  path: paths.dist(),
  publicPath: config.public_path,
  chunkFilename: fileNameFormat(config.compiler_hash_type, 'js')
}

function getLibPath(path) {
  let pach = null;
  try {
    fs.readdirSync(path).forEach((file) => {
      if (file.indexOf('lib') == 0) {
        pach = file;
      }
    });
  } catch (e) {
    console.log(e);
  }
  return pach;
}

for (let i = 0; i < config.scripts.length; i += 1) {
  const script = config.scripts[i];
  if (script.indexOf('http') != 0) {
    config.scripts[i] = config.public_path + script;
  }
}

config.scripts.push(config.public_path + getLibPath(config.utils_paths.lib()));

webpackConfig.plugins = [
  new webpack.DefinePlugin(config.globals),
  new CleanWebpackPlugin(['*'], {
    root: paths.dist()
  }),
  // new webpack.ProgressPlugin(),
  new webpack.DllReferencePlugin({
    context: paths.lib(),
    manifest: require(paths.lib('manifest.json')),
    extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json']
  }),
  new HtmlWebpackPlugin({
    template: paths.client('index.html'),
    hash: false,
    minify: {
      collapseWhitespace: true
    },
    title: config.title,
    filename: 'index.html',
    inject: 'body',
    globals: Object.assign(config.globals, {
      keyword: config.keyword,
      description: config.description,
      scripts: config.scripts
    })
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: function () {
        return [
          cssnano({
            autoprefixer: {
              add: true,
              browsers: ['iOS >= 7', 'Android >= 4.1']
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
            rootValue: 50,
            propWhiteList: []
          })
        ]
      }
    }
  })
]
if (__DEV__) {
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin())
} else {
  webpackConfig.plugins.push(
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: ['app'],
    //   minChunks: function (module, count) {
    //     return module.context && module.context.indexOf('node_modules') !== -1
    //   }
    // }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }), new ExtractTextPlugin({
      filename: fileNameFormat(config.compiler_hash_type, 'css'),
      allChunks: true
    }))
}

webpackConfig.module.rules = [{
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: ['babel-loader', 'eslint-loader']
}, {
  test: /\.yml$/,
  use: ['json-loader', 'yaml-loader']
}, {
  test: /\.json$/,
  use: 'json-loader'
}, {
  test: /\.(svg)(\?.*)?$/,
  include: paths.client(),
  use: {
    loader: 'url-loader',
    options: {
      limit: 10240,
      name: fileNameFormat('hash')
    }
  }
}, {
  test: /\.(png|jpe?g|gif)(\?.*)?$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 10240,
      name: fileNameFormat('hash')
    }
  }
}, {
  test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
  use: {
    loader: 'url-loader',
    options: {
      limit: 10240,
      name: fileNameFormat('hash')
    }
  }
}]

function loaderAnalysis(loaders) {
  if (__PROD__) {
    return ExtractTextPlugin.extract({
      fallback: loaders.shift(),
      use: loaders
    })
  }
  return loaders
}

const theme = {
  // 'primary-color': '#f54b37'
}

webpackConfig.module.rules.push({
  test: /\.css$/,
  use: loaderAnalysis(['style-loader', 'css-loader', 'postcss-loader'])
})
webpackConfig.module.rules.push({
  test: /\.less$/,
  use: loaderAnalysis(['style-loader', 'css-loader', 'postcss-loader', `less-loader?{'modifyVars':${JSON.stringify(theme)}}`])
})

module.exports = webpackConfig
