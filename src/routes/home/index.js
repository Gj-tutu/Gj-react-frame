import Common from '../../lib/Common'
/**
 * 首页
 */
export const config = {
  path: '/',
  title: 'index',
  description: 'index',
  keyword: 'index',
  needLogin: false
}
export default (store) => ({
  onEnter: (props, replace) => {
    Common.pageEnter(config, store, props, replace)
  },
  onLeave: (props, replace) => {
    Common.pageLeave(config, store, props, replace)
  },
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const base = require('../../store/data/base')
      const page = require('./page').default
      const option = require('./option')
      Common.pageView(store, cb, page, option, [base])
    })
  }
})
