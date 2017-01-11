import Common from '../../../lib/Common'

export const config = {
  path: 'template/test',
  name: '模板'
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
      const page = require('../../../store/page')
      const pageReducer = require('./modules')
      page.registerPage(store, [pageReducer])
      const data = require('../../../store/data')
      const base = require('../../../data/base')
      data.registerData(store, [base])
      const pageView = require('./containers').default
      cb(null, pageView)
    })
  }
})
