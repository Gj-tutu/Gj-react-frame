import { registerData } from '../store/data'
import { connect } from 'react-redux'
import { replaceLink, goBack } from './tools'
import { isLogin, getInfo, userRole, roleUrl } from '../store/data/user'
import { hashHistory } from 'react-router'
import { load, loaded, toast } from './Events'
window.Promise = require('promise')

var Common = {
  isLogin: false,
  allowInit (config) {
    let allow = !(config.needLogin && !this.isLogin)
    if (allow) {
      allow = this.havePower(config.notRole)
    }
    return allow
  },
  pageChange (e) {
    load()
  },
  pageChangeEnd () {
    loaded(false)
  },
  pageEnter (config, store, props, replace) {
    let login = isLogin(store)
    if (login) this.alreadyLogin()
    if (config.needLogin && !login) {
      this.goToLogin()
      return
    }
    let userInfo = getInfo(store)
    if (!this.role) Common.role = userInfo.role
    if (!this.havePower(config.notRole)) {
      setTimeout(() => (replaceLink(roleUrl[userInfo.role] + userInfo.store_id)), 1)
    }
  },
  pageReplace (config, location, user) {

  },
  pageLeave (config, store, props) {

  },
  pageInit () {

  },
  pageView (store, cb, page, option, data) {
    if (option) {
      if (!data) data = []
      data.push(option)
    }

    if (data && data.length > 0) {
      registerData(store, data)

      let mapDispatchtoProps = option ? option.action : {}
      let mapStateToProps = (state) => {
        let result = {}
        for (let i = 0; i < data.length; i++) {
          let KEY = data[i].KEY
          let name = data[i].option ? 'option' : KEY
          result[name] = state.data.get(KEY)
        }
        return result
      }

      cb(null, connect(mapStateToProps, mapDispatchtoProps)(page))
    } else {
      cb(null, page)
    }
  },
  havePower (notRole) {
    return notRole ? notRole.has(this.role) < 0 : true
  },
  alreadyLogin () {
    if (!this.isLogin) {
      this.isLogin = true
      if (!window.appSocket.connected) {
        window.appSocket.open()
      }
    }
  },
  goToLogin () {
    if (this.isLogin) {
      this.isLogin = false
      if (!window.appSocket.disconnected) {
        window.appSocket.close()
      }
    }
    setTimeout(function () { replaceLink('/user/login') }, 1)
  },
  locationNum: 0,
  isCallBack: false,
  locationPush () {
    this.locationNum ++
    this.isCallBack = false
  },
  locationPop () {
    if (this.locationNum > 0) {
      this.locationNum --
      this.isCallBack = true
    }
  },
  locationReplace () {
    Common.isCallBack = false
  },
  locationChange (event) {
    if (event.action === 'POP') {
      this.locationPop()
    } else if (event.action === 'REPLACE') {
      this.locationReplace()
    } else {
      this.locationPush()
    }
    this.pageChange()
  }
}
hashHistory.listen(Common.locationChange.bind(Common))

export default Common
