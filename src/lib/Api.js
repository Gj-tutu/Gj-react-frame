/**
 * http请求封装类
 */
import { ApiPath, GET, FORM, UPLOAD } from './ApiSetting'
import { load, loaded, fail } from './Events'
const Request = require('superagent')

class Api {
  static request(api, data, showLoad = true, showLoaded = true, showFail = true) {
    /**
     * 封装对外接口
     */
    return Api.handle(api.url, { method: api.method, data: data, type: api.type, third: api.third }, showLoad, showLoaded, showFail)
  }
  static send(url, option) {
    /**
     * api底层接口
     */
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
        .accept('application/json')
      if (option.method === GET) {
        request.query(data)
      } else {
        if (option.type === UPLOAD) {
          for (let i in data) {
            if (data[i] instanceof File) {
              request.attach(i, data[i], 'image.png')
            } else {
              request.field(i, data[i])
            }
          }
        } else if (option.type === FORM) {
          request.type('form')
            .send(data)
        } else {
          request.send(data)
        }
      }
      request.timeout(30 * 1000)
        .end((error, response) => {
          if (error) {
            reject(new Error('网络链接错误,服务暂时不可用'))
          } else {
            resolve(response)
          }
        })
    })
  }
  static handle(url, option, showLoad = true, showLoaded = true, showFail = true) {
    /**
     * api处理流程封装
     */
    if (showLoad) load()
    return Api.send(url, option)
      .then((response) => {
        if (response.ok) {
          return response.body
        } else {
          throw new Error('网络链接错误,服务暂时不可用')
        }
      }).then((data) => {
        // 第三方接口，自行处理
        if (option.third) data.code = 200
        if (data.code === 200) {
          if (showLoad) loaded(showLoaded)
          return option.third ? data : data.data
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
