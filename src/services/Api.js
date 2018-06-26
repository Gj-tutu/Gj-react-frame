/**
 * http请求封装类
 */
import { load, loaded, fail } from './Events'
import Common from './Common'
const Request = require('superagent')

export const POST = 'post'
export const GET = 'get'
export const PUT = 'put'
export const DELETE = 'delete'
export const FORM = 'formData'
export const UPLOAD = 'formField'
export const ApiPath = __API_PATH__

class Api {
  static get(url, data, loadOption) {
    return Api.request({ url, method: GET }, data, loadOption)
  }
  static post(url, data, loadOption) {
    return Api.request({ url, method: POST }, data, loadOption)
  }
  static form(url, data, loadOption) {
    return Api.request({ url, method: POST, type: FORM }, data, loadOption)
  }
  static request(api, data, loadOption = {}) {
    /**
     * 封装对外接口
     */
    return Api.handle(api.url, { method: api.method, data: data, type: api.type }, loadOption)
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
        if (option.type === FORM) {
          for (let i in data) {
            if (data[i] instanceof File) {
              request.attach(i, data[i], data[i].name)
            } else {
              request.field(i, data[i])
            }
          }
        } else {
          request.send(data)
        }
      }
      if (option.data.token !== false) {
        request.set('token', window.appCache.getCache('token', true))
      }
      request.timeout(30 * 1000)
        .end((error, response) => {
          if (error) {
            reject(new Error('网络不给力，请重试'))
          } else {
            resolve(response)
          }
        })
    })
  }
  static handle(url, option, { showLoad = true, showLoaded = false, showFail = true, loadedText = '' }) {
    /**
     * api处理流程封装
     */
    if (showLoad) load()
    return Api.send(url, option)
      .then((response) => {
        if (response.ok) {
          return response.body
        } else {
          throw new Error('网络请求错误，请重试')
        }
      }).then((data) => {
        if (data.code === 0) {
          if (showLoad) loaded(showLoaded, loadedText)
          return data.data
        } else {
          if (data.code == 18) {
            if (showLoad) loaded(false)
            Common.goToLogin()
            showFail = false
          }
          throw new Error(data.msg)
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
