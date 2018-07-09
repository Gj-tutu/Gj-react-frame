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

export function distinct(arr) {
  let result = []
  let i = 0
  let j = 0
  let len = arr.length
  for (i = 0; i < len; i++) {
    for (j = i + 1; j < len; j++) {
      if (arr[i] === arr[j]) {
        j = ++i
      }
    }
    result.push(arr[i])
  }
  return result
}

export function SortByProps(item1, item2, props) {
  let cps = []
  for (let i = 0; i < props.length; i++) {
    let prop = props[i]
    let asc = prop.direction > 0
    if (!item1[prop.key] && item1[prop.key] != 0) {
      cps.push(1)
      break
    }
    if (!item2[prop.key] && item2[prop.key] != 0) {
      cps.push(-1)
      break
    }
    if (prop.type == 'number') {
      if (item1[prop.key] === item2[prop.key]) {
        cps.push(0)
      } else {
        let a = item1[prop.key] == 0 ? 0 : Number(item1[prop.key]) || false
        let b = item1[prop.key] == 0 ? 0 : Number(item2[prop.key]) || false
        if (a === false && b === false) {
          let result = item1[prop.key] > item2[prop.key] ? 1 : -1
          cps.push(asc ? result : -1 * result)
        } else if (a === false || b === false) {
          let result = a === false ? 1 : -1
          cps.push(asc ? result : -1 * result)
        } else {
          let result = a - b > 0 ? 1 : -1
          cps.push(asc ? result : -1 * result)
        }
        break
      }
    } else {
      if (item1[prop.key] == '') {
        cps.push(1)
        break
      }
      if (item2[prop.key] == '') {
        cps.push(-1)
        break
      }
      if (item1[prop.key] > item2[prop.key]) {
        cps.push(asc ? 1 : -1)
        break
      } else if (item1[prop.key] === item2[prop.key]) {
        cps.push(0)
      } else {
        cps.push(asc ? -1 : 1)
        break
      }
    }
  }

  for (let j = 0; j < cps.length; j++) {
    if (cps[j] === 1 || cps[j] === -1) {
      return cps[j]
    }
  }
  return false
}

export function getCacheData(key, time, original, force) {
  let data
  if (!force) {
    data = window.appCache.getCache(key + '_data')
  }
  if (data) {
    return Promise.resolve(data)
  } else {
    try {
      return original().then((result) => {
        window.appCache.setCache(key + '_data', result, time)
        return result
      })
    } catch (err) {
      console.log('original get error')
      return Promise.reject(err)
    }
  }
}

export function searchKeyword(data, key, keyword, limit) {
  const list = []
  const tmp = {}
  for (let i = 0; i < data.length; i += 1) {
    if (data[i][key] && !tmp[data[i][key]] && data[i][key].indexOf(keyword) >= 0) {
      list.push(data[i][key])
      tmp[data[i][key]] = true
      if (limit && list.length >= limit) break
    }
  }
  return list
}

export function getMap(list, key = 'value', value = 'label') {
  const map = {}
  for (let i = 0; i < list.length; i += 1) {
    map[list[i][key]] = list[i][value]
  }
  return map
}
