import Common from '../../lib/Common'

export const config = {
  path: '404',
  name: '该页面不存在'
}

export default (store) => ({
  path: config.path,
  onEnter: (props, replace) => {
    Common.pageEnter(config, store, props, replace)
  },
  onLeave: (props, replace) => {
    Common.pageLeave(config, store, props, replace)
  },
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const page = require('./components').default
      Common.pageView(store, cb, page)
    })
  }
})
