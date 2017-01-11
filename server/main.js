const express = require('express')
const debug = require('debug')('app:server')
const webpack = require('webpack')
const webpackConfig = require('../build/webpack.config')
const config = require('../config')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const request = require('request')
const app = express()
const paths = config.utils_paths

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.all('/api/*', (req, res) => {
  let option = {}
  option.method = req.method
  if (req.method === 'POST') {
    option.body = JSON.stringify(req.body)
  }
  option.headers = req.headers

  let url = req.url
  url = url.substr(5, url.length - 5)
  url = `${config.api_path}${url}`
  option.url = url
  request(option, function (error, response, body) {
    if (!error) {
      console.log(response.body)
    } else {
      console.log(error)
    }
    if (!error && response.statusCode === 200) {
      if(response.headers['set-cookie']) {
        res.setHeader('set-cookies', response.headers['set-cookie'])
      }
      res.send(response.body)
    } else {
      res.send(JSON.stringify({ status_code: 500, message: '接口请求错误', data: {} }))
    }
  })
})

// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement universal
// rendering, you'll want to remove this middleware.
app.use(require('connect-history-api-fallback')())

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (config.env === 'development') {
  const compiler = webpack(webpackConfig)

  debug('Enable webpack dev and HMR middleware')
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath  : webpackConfig.output.publicPath,
    contentBase : paths.client(),
    hot         : true,
    quiet       : config.compiler_quiet,
    noInfo      : config.compiler_quiet,
    lazy        : false,
    stats       : config.compiler_stats
  }))
  app.use(require('webpack-hot-middleware')(compiler))

  // Serve static assets from ~/src/static since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(paths.client('static')))
} else {
  debug(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(paths.dist()))
}

module.exports = app
