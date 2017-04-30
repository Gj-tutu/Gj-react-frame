import { ApiPath } from './ApiSetting'
import { load, loaded, fail, offline, toast } from './Events'
const Request = require('superagent')

class Api {

  static request (api, data, showLoad = true, showLoaded = true, showFail = true) {
    let option = { method: api.method, data: data }
    return Api.handle(api.url, option, showLoad, showLoaded, showFail)
  }

  static send (url, option) {
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
    let data = {}
    for (let i in option.data) {
      if (option.data[i] || option.data[i] === 0) data[i] = option.data[i]
    }
    return new Promise((resolve, reject) => {
      let request = Request(option.method, `${ApiPath}${url}`)
        .type('application/json')
        .accept('application/json')
      if (option.method === 'post') {
        request = request.send(data)
      } else {
        request = request.query(data)
      }
      request.send(data).end((error, response) => {
        if (error) {
          if (__DEBUG__) console.log(error)
          reject(new Error('网络链接错误,服务暂时不可用'))
        } else {
          resolve(response)
        }
      })
    })
  }

  static handle (url, option, showLoad = true, showLoaded = true, showFail = true) {
    if (showLoad) load()
    return Api.send(url, option).then((response) => {
      if (response.ok) {
        return response.body
      } else {
        throw new Error('网络链接错误,服务暂时不可用')
      }
    }).then((data) => {
      if (data.status === 200) {
        if (showLoad) loaded(showLoaded)
        return data.result
      } else {
        if (data.status !== 500) {
          throw new Error(data.message)
        } else {
          throw new Error(data.message)
        }
      }
    }).catch((error) => {
      if (showLoad) loaded(false)
      if (showFail) fail(error.message)
      if (__DEBUG__) console.log(error)
      throw error
    })
  }
}
export default Api
