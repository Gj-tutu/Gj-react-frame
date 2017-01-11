import 'whatwg-fetch'
import { ApiPath } from './ApiSetting'
import { load, loaded } from './Events'

class Api {

  token = ''
  static api = null

  constructor () {
  }

  static single () {
    if (!Api.api) {
      Api.api = new Api()
    }
    return Api.api
  }

  request (api, data, showLoad = true, showLoaded = true) {
    let option = { method: api.method, data: data }
    return this.handle(api.url, option, showLoad, showLoaded)
  }

  static send (url, option) {
    let request = {}
    let paramList = url.match(/\{.*?\}/g)
    if (paramList && paramList.length > 0) {
      for (let k in paramList) {
        let key = paramList[k].substr(1, paramList[k].length - 2)
        let param = option.data[key]
        if (!param) return Promise.reject(new Error('参数错误'))
        url = url.replace(paramList[k], param)
        option.data[key] = null
      }
    }
    request.method = option.method
    request.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    if (!window.Env.isAndroid) {
      request.headers['Cookie'] = window.document.cookie
    }
    if (option.method === 'post') {
      request.body = JSON.stringify(option.data)
    }
    request.credentials = 'include'
    if (option.method === 'get') {
      let data = `?`
      for (let i in option.data) {
        if (!option.data[i]) continue
        data = `${data}${i}=${option.data[i]}&`
      }
      data = data.substring(0, data.length - 1)
      url = `${url}${encodeURI(data)}`
    }
    return fetch(`${ApiPath}${url}`, request)
  }

  handle (url, option, showLoad = true, showLoaded = true) {
    if (showLoad) load()
    return Api.send(url, option).then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        if (showLoad) loaded(false)
        throw new Error('网络链接错误,服务暂时不可用')
      }
    }).then((result) => {
      if (result.code === 200) {
        if (showLoad) loaded(showLoaded)
        return result.data
      } else {
        if (result.code !== 500) {
          throw new Error(result.error.errorMsg)
        } else {
          throw new Error(result.message)
        }
      }
    }).catch((error) => {
      if (showLoad) loaded(false)
      throw error
    })
  }
}
export default Api
