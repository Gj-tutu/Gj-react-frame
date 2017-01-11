import Common from '../../lib/Common'

export const config = {
  path: '404',
  name: '该页面不存在',
  needLogin: false,
  anyOne: true
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
      const pageView = require('./components').default
      cb(null, pageView)
    })
  }
})
