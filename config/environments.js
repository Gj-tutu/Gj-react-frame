var defaultConfig = {
  compiler_babel: {
    cacheDirectory: true,
    plugins: [
      ['transform-runtime', { 'polyfill': false, 'regenerator': true }],
      ['import', [{ 'libraryName': 'antd', 'style': 'css' }, { 'libraryName': 'antd-mobile', 'style': 'css' }]]
    ],
    presets: ['es2015', 'react', 'stage-0']
  },
  compiler_hash_type: 'hash',
  compiler_fail_on_warning: true,
  compiler_quiet: false,
  compiler_stats: {
    chunks: false,
    chunkModules: false,
    colors: true
  },
  compiler_vendors: []
}
module.exports = {
  // ======================================================
  // Overrides when NODE_ENV === 'development'
  // ======================================================
  development: () => Object.assign(defaultConfig, {}),
  // ======================================================
  // Overrides when NODE_ENV === 'test'
  // ======================================================
  test: () => Object.assign(defaultConfig, {}),
  // ======================================================
  // Overrides when NODE_ENV === 'production'
  // ======================================================
  production: () => Object.assign(defaultConfig, {
    compiler_fail_on_warning: false,
    compiler_hash_type: 'chunkhash',
    compiler_stats: {
      chunks: true,
      chunkModules: true,
      colors: true
    }
  })
}
