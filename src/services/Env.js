/**
 * 运行环境处理
 */
import * as events from 'events'
import CacheManage from './Cache'
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
  width = 0
  height = 0
  constructor(window) {
    this.initPlant(window)
    this.initFunc(window)
  }
  initPlant() {
    /**
     * 当前访问场景初始化
     */
    var agent = window.navigator.userAgent.toLowerCase()
    this.isIpad = agent.match(/ipad/i) == 'ipad'
    this.isIpod = agent.match(/ipod/i) == 'ipod'
    this.isIphone = agent.match(/iphone os/i) == 'iphone os'
    this.isAndroid = agent.match(/android/i) == 'android'
    this.isWindowPhone = agent.match(/windows phone/i) == 'windows phone'
    this.isSymbian = agent.match(/symbianos/i) == 'symbianos'
    this.isWeiXin = agent.match(/MicroMessenger/i) == 'micromessenger'
    this.isIe = agent.match(/msie/i) == 'msie'
    this.isFirefox = agent.match(/firefox/i) == 'firefox'
    this.isChrome = agent.match(/chrome/i) == 'chrome'
    this.isSafari = agent.match(/safari/i) == 'safari'
    this.isOpera = agent.match(/opera/i) == 'opera'
    if (this.isIpad || this.isIpod || this.isIphone) this.isIos = true
    if (this.isIpad || this.isIpod || this.isIphone || this.isAndroid || this.isWindowPhone || this.isSymbian) {
      this.isMobile = true
    } else {
      this.isPc = true
    }
  }
  initFunc(window) {
    /**
     * 当前环境基本接口初始化
     */
    window.appEvent = new events.EventEmitter()
    window.appCache = new CacheManage()
    window.Promise = require('promise')

    window.Promise.prototype.finally = function (callback) {
      let P = this.constructor
      return this.then(
        value => P.resolve(callback()).then(() => value),
        reason => P.resolve(callback()).then(() => { throw reason })
      )
    }
    window.Promise.prototype.end = function (callback) {
      Promise.resolve().then(() => {
        return this
      }).then((result) => {
        callback(result)
        return result
      })
      return this
    }
    window.Promise.prototype.except = function (callback) {
      Promise.resolve().then(() => {
        return this
      }).catch((err) => {
        callback(err)
        throw err
      })
      return this
    }
    window.Date.prototype.format = function (format) {
      if (!format) format = 'yyyy-MM-dd'
      var o = {
        'M+': this.getMonth() + 1,
        'd+': this.getDate(),
        'h+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3),
        'S': this.getMilliseconds()
      }
      if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
      return format
    }
  }
}
export default new Env(window)
