import { registerData } from '../store/data'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { load, loaded } from './Events'

var Common = {
  allowInit(config) {
    return true
  },
  pageChange(e) {
    load()
  },
  pageChangeEnd() {
    loaded(false)
  },
  pageEnter(config, store, props, replace) {

  },
  pageReplace(config, location, user) {

  },
  pageLeave(config, store, props) {

  },
  pageInit() {

  },
  pageView(store, cb, page, option, data) {
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
