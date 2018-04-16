import Api from '../../lib/Api'
import ApiSetting from '../../lib/ApiSetting'
import Common from '../../lib/Common'
/**
 * 用户相关接口,登录缓存,状态判断等
 */

export const KEY = 'user'
const USER_LOGIN = 'USER_LOGIN'
const USER_REGISTER = 'USER_REGISTER'
const USER_LOGOUT = 'USER_LOGOUT'

export function isLogin(store) {
  return store.getState().data[KEY].login
}
export function getInfo(store) {
  return store.getState().data[KEY].info
}
export function demoLogin() {
  Common.alreadyLogin()
  return {
    KEY,
    type: USER_LOGIN,
    payload: {
      value: null
    }
  }
}
export function login(email, password) {
  return (dispatch, getState) => {
    return Api.request(ApiSetting.userLogin, { email, password }, true, false).then((result) => {
      dispatch({
        KEY,
        type: USER_LOGIN,
        payload: {
          value: result
        }
      })
      return result
    })
  }
}
export function register(email, password, firstName, lastName) {
  return (dispatch, getState) => {
    return Api.request(ApiSetting.userRegister, { email, password, firstName, lastName }, true, false).then((result) => {
      dispatch({
        KEY,
        type: USER_REGISTER,
        payload: {
          value: result
        }
      })
      return result
    })
  }
}
export function logout() {
  return (dispatch, getState) => {
    return Api.request(ApiSetting.userLogout, {}, true, false).then((result) => {
      dispatch({
        KEY,
        type: USER_LOGOUT,
        payload: {
          value: result
        }
      })
      return result
    })
  }
}
export function info() {
  return (dispatch, getState) => {
    return Api.request(ApiSetting.userInfo, {}, false, true, false).then((result) => {
      dispatch({
        KEY,
        type: USER_LOGIN,
        payload: {
          value: result
        }
      })
      return result
    })
  }
}
export function saveLocal(user) {
  window.appCache.setCache('account', user, 0, true)
}
export function clearLocal() {
  window.appCache.removeCache('account', true)
}
export function getLocal() {
  return window.appCache.getCache('account', true)
}
const ACTION_HANDLERS = {
  [USER_LOGIN](state, action) {
    saveLocal(action.payload.value)
    state.login = true
    state.info = action.payload.value
    return {
      ...state
    }
  },
  [USER_REGISTER](state, action) {
    saveLocal(action.payload.value)
    state.login = true
    state.info = action.payload.value
    return {
      ...state
    }
  },
  [USER_LOGOUT](state, action) {
    clearLocal()
    state.login = false
    state.info = {}
    return {
      ...state
    }
  }
}
export const initState = {
  login: false,
  info: {}
}
export default function (state = initState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
