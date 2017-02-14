import * as events from 'events'

class Env {
  isWeiXin = false
  isWeiXinDev = false
  isIe = false
  isChrome = false
  isSafari = false
  isFirefox = false
  isOpera = false
  isIpad = false
  isIpod = false
  isIphone = false
  isAndroid = false
  isWindowPhone = false
  isMobile = false
  isIos = false
  isPc = false
  dpr = 1
  rem = 0
  width = 0
  height = 0

  constructor (window) {
    this.initPlant(window)
    this.initFunc(window)
  }

  initPlant () {
    var agent = window.navigator.userAgent.toLowerCase()
    this.isIpad = agent.match(/ipad/i) == "ipad"
    this.isIpod = agent.match(/ipod/i) == "ipod"
    this.isIphone = agent.match(/iphone os/i) == "iphone os"
    this.isAndroid = agent.match(/android/i) == "android"
    this.isWindowPhone = agent.match(/windows phone/i) == "windows phone"
    this.isSymbian = agent.match(/symbianos/i) == "symbianos"
    this.isWeiXin = agent.match(/MicroMessenger/i) == "micromessenger"
    this.isIe = agent.match(/msie/i) == "msie"
    this.isFirefox = agent.match(/firefox/i) == "firefox"
    this.isChrome = agent.match(/chrome/i) == "chrome"
    this.isSafari = agent.match(/safari/i) == "safari"
    this.isOpera = agent.match(/opera/i) == "opera"
    this.isWeiXinDev = agent.match(/wechatdevtools/i) == "wechatdevtools"
    if (this.isIpad || this.isIpod || this.isIphone) this.isIos = true
    if (this.isIpad || this.isIpod || this.isIphone ||
       this.isAndroid || this.isWindowPhone || this.isSymbian) {
      this.isMobile = true
    } else {
      this.isPc = true
    }
  }

  initView (window) {
    var dpr, rem, scale;
    var docEl = document.documentElement
    var fontEl = document.createElement('style')
    var metaEl = document.querySelector('meta[name="viewport"]')
    if (this.isPc) {
      dpr = 1
    } else {
      dpr = Number.parseInt(window.devicePixelRatio) || 1
    }

    dpr = dpr > 3 ? 3 : dpr

    this.width = docEl.clientWidth > 750 ? 750 : docEl.clientWidth
    this.height = docEl.clientHeight

    rem = this.width * dpr / 10
    scale = 1 / dpr

    // 设置viewport，进行缩放，达到高清效果
    metaEl.setAttribute('content', 'width=' + dpr * this.width + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no')

    // 设置data-dpr属性，留作的css hack之用
    docEl.setAttribute('class', "dpr"+dpr)

    // 动态写入样式
    docEl.firstElementChild.appendChild(fontEl)
    fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;}'

    this.dpr = dpr
    this.rem = rem
  }

  initFunc (window) {
    window.appEvent = new events.EventEmitter()

    Object.defineProperty(Array.prototype, "inArray", {
      value: function(value) {
        let _list = Object(this)
        let _length = _list.length >>> 0;
        for (let i = 0; i < _length; i++) {
          if (_list[i] == value) return i
        }
        return -1
      }
    });

    window.setCookie = (name, value, time) => {
      var exp = new Date()
      exp.setTime(exp.getTime() + time * 1000)
      document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/'
    }
    window.getCookie = (name) => {
      var arr, reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)")
      if (arr = document.cookie.match(reg)) {
        return unescape(arr[2])
      } else {
        return null
      }
    }
    window.delCookie = (name) => {
      var exp = new Date()
      exp.setTime(exp.getTime() - 1)
      var cval = window.getCookie(name)
      if (cval != null) {
        document.cookie = name + "="+cval+";expires="+exp.toGMTString() + ';path=/'
      }
    }
  }

  rem2px (v) {
    v = parseFloat(v)
    return v * this.rem
  }

  px2rem (v) {
    v = parseFloat(v)
    return v / this.rem
  }

  ps2px (v) {
    return v / 750 * this.width
  }

}
export default Env
