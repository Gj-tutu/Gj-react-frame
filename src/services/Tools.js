import { ListView } from 'antd-mobile'
import { browserHistory } from 'react-router'
/**
 * 工具类
 */
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
  browserHistory.push(link)
}
export const toLink = (link) => {
  /**
   * 跳转页面
   */
  location.href = link
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

export function SortBy(a, b, asc, type) {
  if (!a && a != 0) {
    return 1
  }
  if (!b && b != 0) {
    return -1
  }
  if (a === b) {
    return 0
  }
  if (a == '') {
    return 1
  }
  if (b == '') {
    return -1
  }
  a = `${a}`
  b = `${b}`
  return (type == 'number'
    ? a.localeCompare(b, undefined, { numeric: true })
    : a.localeCompare(b, 'zh', { co: 'pinyin' })) * asc
}

export function SortByProps(item1, item2, props) {
  let cps = []
  for (let i = 0; i < props.length; i++) {
    let prop = props[i]
    let asc = prop.direction > 0 ? 1 : -1
    cps.push(SortBy(item1[prop.key], item2[prop.key], asc, prop.type))
  }

  for (let j = 0; j < cps.length; j++) {
    if (cps[j] === 1 || cps[j] === -1) {
      return cps[j]
    }
  }
  return false
}
export function getCacheData(original, { key = null, time = 0, local = false, force = false }) {
  let data = null
  if (!force && key) {
    data = window.appCache.getCache(key + '_data', local)
  }
  if (data) {
    return Promise.resolve(data)
  } else {
    try {
      return original().then((result) => {
        if (key) {
          window.appCache.setCache(key + '_data', result, time, local)
        }
        return result
      })
    } catch (err) {
      console.log('original get error')
      return Promise.reject(err)
    }
  }
}

export function setCacheData(key, time, data) {
  window.appCache.setCache(key + '_data', data, time)
}

export function clearCacheData(key) {
  window.appCache.removeCache(key + '_data')
}

export function searchKeyword(data, key, keyword, limit) {
  const list = []
  const tmp = {}
  for (let i = 0; i < data.length; i += 1) {
    let item = key ? data[i][key] : data[i]
    if (item && !tmp[item] && item.indexOf(keyword) >= 0) {
      list.push(item)
      tmp[item] = true
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

const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID]
const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID]
export const NewDataSource = function () {
  return new ListView.DataSource({
    getRowData,
    getSectionHeaderData: getSectionData,
    rowHasChanged: (row1, row2) => { return row1 !== row2 },
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2
  })
}

export function getMap(list, key = 'value', value = null) {
  const map = {}
  for (let i = 0; i < list.length; i += 1) {
    map[list[i][key]] = value ? list[i][value] : list[i]
  }
  return map
}
export const ListData = function (field = 'id') {
  this.field = field
  this.maxSectionId = 0
  this.maxSectionId = 0
  this.loading = false
  this.bottom = false
  this.top = false
  this.dataSource = NewDataSource()
  this.dataBlob = {}
  this.sectionIDs = []
  this.rowIDs = []
  this.count = -1
  this.total = 0
  this.dataSource = NewDataSource().cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs)
}

ListData.prototype.refresh = function () {
  this.sectionIDs = []
  this.rowIDs = []
  this.dataBlob = {}
  this.maxSectionId = 0
  this.maxSectionId = 0
  this.loading = false
  this.bottom = false
  this.top = false
  this.total = 0
  this.dataSource = NewDataSource().cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs)
}

ListData.prototype.append = function (sectionId, data, preNumber) {
  let dataNum = data.length
  let ids = []
  for (let i = 0; i < dataNum; i++) {
    let item = data[i]
    let id = `${sectionId}:${item[this.field]}`
    this.dataBlob[id] = item
    ids.push(id)
  }
  let index = this.sectionIDs.indexOf(sectionId)
  if (index >= 0) {
    this.rowIDs[index] = ids
  } else {

  }
  this.sectionIDs = [sectionId].concat(this.sectionIDs)
  this.rowIDs = [ids].concat(this.rowIDs)
  this.dataSource = this.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs)
  this.minSectionId = sectionId
  this.loading = false
  // console.log('append', data, preNumber)
  if (dataNum < preNumber) {
    this.top = true
    if (this.sectionIDs.length == 1) this.bottom = true
  }
  this.total += dataNum
}
ListData.prototype.push = function (sectionId, data, preNumber) {
  // console.log('push', sectionId, data, preNumber)
  let dataNum = data.length
  let ids = []
  for (let i = 0; i < dataNum; i++) {
    let item = data[i]
    let id = `${sectionId}:${item[this.field]}`
    this.dataBlob[id] = item
    ids.push(id)
  }
  let index = this.sectionIDs.indexOf(sectionId)
  if (index >= 0) {
    this.rowIDs[index] = ids
  } else {
    this.sectionIDs.push(sectionId)
    this.rowIDs.push(ids)
    this.sectionIDs = [].concat(this.sectionIDs)
    this.rowIDs = [].concat(this.rowIDs)
  }

  this.dataSource = this.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs)
  this.maxSectionId = sectionId
  this.loading = false
  if (dataNum < preNumber) {
    this.bottom = true
    if (this.sectionIDs.length == 1) this.top = true
  }
  this.total += dataNum
}
ListData.prototype.pop = function () {
  console.log('pop', this.sectionIDs.length)
  if (this.sectionIDs.length == 0) return
  this.sectionIDs.pop()
  this.sectionIDs = [].concat(this.sectionIDs)
  let ids = this.rowIDs.pop()
  ids.forEach((row) => { delete this.dataBlob[row] })
  this.dataSource = this.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs)
  this.maxSectionId = this.sectionIDs[this.sectionIDs.length - 1]
  this.bottom = false
  this.total -= ids.length
}
ListData.prototype.shift = function () {
  console.log('shift', this.sectionIDs.length)
  if (this.sectionIDs.length == 0) return
  this.sectionIDs.pop()
  this.sectionIDs = [].concat(this.sectionIDs)
  let ids = this.rowIDs.pop()
  ids.forEach((row) => { delete this.dataBlob[row] })
  this.dataSource = this.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs)
  this.minSectionId = this.sectionIDs[0]
  this.top = false
  this.total -= ids.length
}
ListData.prototype.get = function (sectionId, value, preNumber) {
  this.count = value.count
  return this.push(sectionId, value.list, preNumber)
}
ListData.prototype.load = function () {
  this.loading = true
}
ListData.prototype.delete = function (sectionId, rowId) {
  let index = this.sectionIDs.indexOf(sectionId)
  if (index == -1) return
  this.rowIDs = [].concat(this.rowIDs)
  this.rowIDs[index] = this.rowIDs[index].filter((row) => row != rowId)
  delete this.dataBlob[rowId]
  this.dataSource = this.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs)
  this.total -= 1
}
ListData.prototype.update = function (sectionId, item) {
  let index = this.sectionIDs.indexOf(sectionId)
  if (index == -1) return
  let id = `${sectionId}:${item[this.field]}`
  let tmp = {}
  Object.assign(tmp, item)
  this.dataBlob[id] = tmp
  this.refresh()
}
ListData.prototype._add = function (sectionId, item) {
  let index = this.sectionIDs.indexOf(sectionId)
  if (index == -1) return
  let id = `${sectionId}:${item[this.field]}`
  this.rowIDs[index].push(id)
  this.rowIDs = [].concat(this.rowIDs)

  this.dataBlob[id] = item
  this.dataSource = this.dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs)
  this.total += 1
}
ListData.prototype.add = function (value, preNumber) {
  let push = false
  if (!value || value.length == 0) return
  if (this.sectionIDs.length > 0) {
    let sectionId = this.sectionIDs[this.sectionIDs.length - 1]
    let rowNumber = this.rowIDs[this.sectionIDs.length - 1].length
    if (rowNumber < preNumber) {
      value.splice(0, preNumber - rowNumber).forEach((row) => {
        this._add(sectionId, row)
      })
    } else {
      push = true
    }
  } else {
    push = true
  }
  if (push && value.length > 0) {
    let ids = value.map(row => row.id)
    this.push(Math.min.apply(null, ids), value, preNumber)
  }
}
ListData.prototype.refresh = function () {
  this.dataSource = NewDataSource().cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs)
}
