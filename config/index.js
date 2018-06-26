const path = require('path')
const debug = require('debug')('app:config')
var config = require('./local')

const NODE_ENV = process.env.NODE_ENV || 'development'

debug('Creating default configuration.')

config = Object.assign(config[NODE_ENV], {
  env: NODE_ENV,
  path_base: path.resolve(__dirname, '..'),
  dir_client: 'src',
  dir_dist: 'dist',
  dir_lib: 'lib',
  api_path: `/api`
})

function base() {
  const args = [config.path_base].concat([].slice.call(arguments))
  return path.resolve.apply(path, args)
}
config.utils_paths = {
  base: base,
  client: base.bind(null, config.dir_client),
  dist: base.bind(null, config.dir_dist),
  lib: base.bind(null, config.dir_lib)
}

config.globals = {
  'process.env': {
    'NODE_ENV': JSON.stringify(config.env)
  },
  'NODE_ENV': config.env,
  '__DEV__': config.env === 'development',
  '__PROD__': config.env === 'production',
  '__TEST__': config.env === 'test',
  '__DEBUG__': config.env === 'development' || config.env === 'test',
  '__API_PATH__': `\'${config.api_path}\'`
}

debug(`Looking for environment overrides for NODE_ENV '${config.env}'.`)
const environments = require('./environments')
const overrides = environments[config.env]
if (overrides) {
  debug('Found overrides, applying to default configuration.')
  Object.assign(config, overrides())
} else {
  debug('No environment overrides found, defaults will be used.')
}
module.exports = config
