import Common from '../../lib/Common'

export const config = {
  path: '/',
  name: '首页'
}

export default (store) => ({
  onEnter: (props, replace) => {
    Common.pageEnter(config, store, props, replace)
  },
  onLeave: (props, replace) => {
    Common.pageLeave(config, store, props, replace)
  },
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const data = require('../../store/data')
      const base = require('../../data/base')
      data.registerData(store, [base])
      const pageView = require('./containers').default
      cb(null, pageView)
    })
  }
})
