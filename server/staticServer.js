const express = require('express')
const debug = require('debug')('app:server')
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

debug('start static server!')
app.use(express.static(paths.dist()))
app.use(express.static(paths.lib()))
module.exports = app
