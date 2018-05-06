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
  }
}
export default new Env(window)
