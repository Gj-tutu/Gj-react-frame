import Common from '../../services/Common'
export const config = {
  path: '/error',
  key: 'error',
  name: '错误页'
}
export default (store) => ({
  path: config.path,
  onEnter: (props, replace) => {
    Common.pageEnter(config, store, props, replace)
  },
  onLeave: (props, replace) => {
    Common.pageLeave(config, store, props, replace)
  },
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const page = require('./page').default
      Common.pageView(store, cb, page)
    })
  }
})
