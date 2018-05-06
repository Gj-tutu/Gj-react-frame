import { registerData } from '../store/data'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as account from '../store/data/account'
import * as base from '../store/data/base'

var Common = {
  allowInit(config) {
    return true
  },
  pageChange(e) {},
  pageChangeEnd() {},
  pageEnter(config, store, props, replace) {

  },
  pageReplace(config, location, user) {

  },
  pageLeave(config, store, props) {

  },
  pageInit() {

  },
  pageView(store, cb, page, option, data) {
    /**
     * 页面初始化,配置页面所需数据reducer
     */
    if (!data) data = []
    if (option) {
      data.push(option)
    }
    data.push(base)
    data.push(account)
    if (data && data.length > 0) {
      registerData(store, data)
      let mapDispatchtoProps = option ? option.action : {}
      let mapStateToProps = (state) => {
        let result = {}
        for (let i = 0; i < data.length; i++) {
          let KEY = data[i].KEY
          let name = data[i].option ? 'option' : KEY
          result[name] = state.data[KEY]
        }
        return result
      }
      cb(null, connect(mapStateToProps, mapDispatchtoProps)(page))
    } else {
      cb(null, page)
    }
  },
  locationNum: 0,
  isCallBack: false,
  locationPush() {
    this.locationNum = this.locationNum + 1
    this.isCallBack = false
  },
  locationPop() {
    if (this.locationNum > 0) {
      this.locationNum = this.locationNum - 1
      this.isCallBack = true
    }
  },
  locationReplace() {
    Common.isCallBack = false
  },
  locationChange(event) {
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
browserHistory.listen(Common.locationChange.bind(Common))

export default Common
