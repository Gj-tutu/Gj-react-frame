/**
 * 工具类
 */
import { browserHistory } from 'react-router'
export const setDocumentTitle = (title) => {
  /**
   * 修改浏览器title 兼容ios
   */
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
export const setCookie = (name, value, time) => {
  var exp = new Date()
  exp.setTime(exp.getTime() + time * 1000)
  document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/'
}
export const getCookie = (name) => {
  var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  var arr = reg
  if (arr === document.cookie.match(reg)) {
    return unescape(arr[2])
  } else {
    return null
  }
}
export const delCookie = (name) => {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = window.getCookie(name)
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() + ';path=/'
  }
}
export const getQuery = (name) => {
  /**
   * 获取url参数
   */
  var reg = new RegExp('(^|\\?|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.href.substr(1)
    .match(reg)
  if (r != null) return unescape(r[2])
  return null
}
export const linkTo = (link) => {
  /**
   * 跳转页面
   */
  location.href = link
}
export const toLink = (link) => {
  /**
   * 跳转页面
   */
  browserHistory.push(link)
}
export const replaceLink = (link) => {
  /**
   * 刷新当前页
   */
  browserHistory.replace(link)
}
export const goBack = (func) => {
  /**
   * 返回上一页
   */
  browserHistory.goBack()
}
export const openUrl = (url) => {
  /**
   * 打开新页面
   */
  window.open(url)
}
export function checkMobile(s) {
  var length = s.length
  if (length === 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|)+\d{8})$/.test(s)) {
    return true
  } else {
    return false
  }
}
export function checkEmail(s) {
  if (/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(s)) {
    return true
  } else {
    return false
  }
}
export function loadScript(url, callback) {
  var script = document.createElement('script')
  script.type = 'text/javascript'
  script.async = true
  script.defer = true
  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState == 'loaded' || script.readyState == 'complete') {
        script.onreadystatechange = null
        if (callback) callback()
      }
    }
  } else {
    script.onload = function () {
      if (callback) callback()
    }
  }
  script.src = url
  let head = document.getElementsByTagName('head')[0]
  head.appendChild(script)
}

export function uuid(len, radix) {
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  let uuid = []
  radix = radix || chars.length
  if (len) {
    for (let i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
  } else {
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'
    for (let i = 0; i < 36; i++) {
      if (!uuid[i]) {
        let r = 0 | Math.random() * 16
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uuid.join('')
}
