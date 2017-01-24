import { browserHistory } from 'react-router'
import { load, loaded } from './Events'

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
    let element = window.document.getElementById('app-animation')
    if (e.action == 'POP') {
      if (element) {
        element.className = 'pop'
      }
    } else {
      if (element) {
        element.className = 'push'
      }
    }
    if (login) load()
  },
  locationChangeEnd: () => {
    if (login) loaded(false)
  },
  pageEnter: (config, store, props, replace) => {
  },
  pageReplace: (config, location, userInfo) => {
  },
  pageLeave: (config, store, props) => {

  },
  pageInit: () => {
    Common.locationChangeEnd()
  }
}

browserHistory.listen(Common.locationChange)

export default Common
