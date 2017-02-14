import Common from '../../../lib/Common'

export const config = {
  path: 'user/register',
  name: '注册',
  notLogin: true
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
      const base = require('../../../store/data/base')
      const page = require('./component').default
      const option = require('./option')
      Common.pageView(store, cb, page, option, [base])
    })
  }
})
