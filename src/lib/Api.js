import { ApiPath } from './ApiSetting'
import { load, loaded } from './Events'
import * as Requrest from 'superagent'

class Api {

  static request (api, data, showLoad = true, showLoaded = true) {
    let option = { method: api.method, data: data }
    return Api.handle(api.url, option, showLoad, showLoaded)
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
    return new Promise((resolve, reject) => {
      Requrest(option.method,`${ApiPath}${url}`)
      .type('application/json')
      .accept('application/json')
      .send(option.data).end((err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
  }

  static handle (url, option, showLoad = true, showLoaded = true) {
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
