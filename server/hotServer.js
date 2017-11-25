const express = require('express')
const debug = require('debug')('app:server')
const webpack = require('webpack')
const webpackConfig = require('../build/webpack.config')
const config = require('../config')
const proxy = require('http-proxy-middleware')
const app = express()
const paths = config.utils_paths

for (let i in config.proxy) {
  app.use(proxy(config.proxy[i].from, {
    target: config.proxy[i].target,
    changeOrigin: true,
    pathRewrite: {
      [config.proxy[i].from]: config.proxy[i].to
    }
  }))
}

app.use(require('connect-history-api-fallback')())

const compiler = webpack(webpackConfig)
debug('Enable webpack dev and HMR middleware')
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  contentBase: paths.client(),
  hot: true,
  quiet: config.compiler_quiet,
  noInfo: config.compiler_quiet,
  lazy: false,
  stats: config.compiler_stats
}))

debug('start hot server!')
app.use(require('webpack-hot-middleware')(compiler))
app.use(express.static(paths.client('static')))
app.use(express.static(paths.lib()))
module.exports = app
