import { browserHistory } from 'react-router'
import { load, loaded } from './Events'
import {registerData} from '../store/data'
import { connect } from 'react-redux'

const setDocumentTitle = (title) => {
  document.title = title
  if (window.Env.isIos) {
    var i = document.createElement('iframe')
    i.src = '/favicon.ico'
    i.style.display = 'none'
    i.onload = () => {
      setTimeout(() => {
        i.remove()
      }, 10)
    }
    setTimeout(() => {
      document.body.appendChild(i)
    }, 500)
  }
}

var login = false

var Common = {
  locationChange: (e) => {
    // if (login) load()
  },
  locationChangeEnd: () => {
    // if (login) loaded(false)
  },
  pageEnter: (config, store, props, replace) => {
  },
  pageReplace: (config, location, userInfo) => {
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

      let mapDispatchtoProps = []

      let mapStateToProps = (state) => {
        let result = {}
        for (let i = 0; i < data.length; i++){
          let key = data[i].key
          let name = data[i].option ? "option" : key
          console.log(key, name, data[i])
          result[name] = state.data[key]
        }
        console.log(result)
        return result
      }

      cb(null, connect(mapStateToProps, mapDispatchtoProps)(page))
    } else {
      cb(null, page)
    }
  }
}

browserHistory.listen(Common.locationChange)

export default Common
