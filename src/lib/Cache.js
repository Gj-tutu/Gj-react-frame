
class CacheManage {
  cacheMap = {}

  constructor () {
    this.cacheMap = {}
  }

  getCache (data, func, local) {
    let key = `${data}${this.getCacheKey(func)}`
    if (!this.cacheMap[key]) {
      this.cacheMap[key] = this.makeCache(key, local)
    }
    return this.cacheMap[key]
  }

  getCacheKey (func) {
    return func.name
  }

  makeCache (key, local) {
    if (!local) local = false
    return new Cache(key, local)
  }
}

class Cache extends localStorage {
  local = false
  value = {}
  constructor (key, local) {
    super()
    this.key = key
    this.local = local
  }

  openLocal () {
    this.local = true
  }

  setCache (time, value) {
    this.expTime = this.getNowTime() + time
    this.value = value
    if (this.local) {
      this.setItem(this.expTime, value)
    }
  }

  getCache () {
    if (this.hasCache()) {
      return this.value
    } else {
      return null
    }
  }

  hasCache () {
    if (!this.value && this.local) this.value = this.getItem()
    if (this.expTime && this.getNowTime() > this.expTime) {
      return true
    }
    if (this.value) {
      return true
    }
    return false
  }

  getNowTime () {
    return new Date().getTime() / 1000
  }
}

class localStorage {
  ok = false
  key = ''
  expTime = 0

  constructor () {
    try {
      if (window.localStorage) {
        this.ok = true
      }
    } catch (e) {
      console.log('localStorage not exist')
    }
  }

  getItem () {
    if (this.ok) {
      let value = window.localStorage.getItem(this.key)
      value = JSON.parse(value)
      this.expTime = value.expTime
      return value.data
    } else {
      return null
    }
  }

  setItem (time, value) {
    if (this.ok) {
      value = JSON.stringify({ data: value, expTime: time })
      window.localStorage.setItem(this.key, value)
      return true
    } else {
      return false
    }
  }

  removeItem () {
    if (this.ok) {
      window.localStorage.removeItem(this.key)
      return true
    } else {
      return false
    }
  }
}

export default new CacheManage()
