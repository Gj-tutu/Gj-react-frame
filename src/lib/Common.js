import { load, loaded } from './Events'
import {registerData} from '../store/data'
import { connect } from 'react-redux'
import { setDocumentTitle, replaceLink, linkTo, goBack } from './tools'
import { isLogin } from '../store/data/user'

var Common = {
  locationChange: (e) => {
    load()
  },
  locationChangeEnd: () => {
    loaded(false)
  },
  pageEnter: (config, store, props, replace) => {
    if (config.needLogin) {
      if (!isLogin(store)) {
        setTimeout(() => (linkTo('user/login')), 1)
      }
    }
    if (config.notLogin) {
      if (isLogin(store)) {
        goBack()
      }
    }
    setDocumentTitle(config.name || '商家服务平台')
  },
  pageReplace: (config, location, user) => {

  },
  pageLeave: (config, store, props) => {

  },
  pageInit: () => {
    Common.locationChangeEnd()
  },
  pageView: (store, cb, page, option, data) => {
    if (option) {
      if (!data) data = []
      data.push(option)
    }

    if (data && data.length > 0) {
      registerData(store, data)

      let mapDispatchtoProps = option ? option.action : {}

      let mapStateToProps = (state) => {
        let result = {}
        for (let i = 0; i < data.length; i++){
          let key = data[i].key
          let name = data[i].option ? "option" : key
          result[name] = state.data[key]
        }
        return result
      }

      cb(null, connect(mapStateToProps, mapDispatchtoProps)(page))
    } else {
      cb(null, page)
    }
  }
}

window.appEvent.on("locationChange", Common.locationChange)

export default Common
