import Api from '../../lib/Api'
import ApiSetting from '../../lib/ApiSetting'
// ------------------------------------
// Constants
// ------------------------------------
export const key = 'user'
const USER_LOGIN = 'user_login'
// ------------------------------------
// Actions
// ------------------------------------

export function isLogin (store) {
  return store.getState().data[key].login
}

function login (name, passwd) {
  return (dispatch, getState) => {
    return Api.request(ApiSetting.userLogin, {name, passwd}, true, false)
      .then((result) => {
        saveLocal(result)
        dispatch({
          key,
          type: USER_LOGIN,
          payload: {
            value: result
          }
        })
        return result
      })
  }
}

function saveLocal (user) {
  window.setCookie('user', JSON.stringify(user), 60 * 60 * 24 * 30)
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [USER_LOGIN]: (state, action) => {
    state.login = true
    state.info = action.payload.value
    return { ...state }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const localInfo = window.getCookie('user')
if (localInfo) {
  saveLocal(localInfo)
}
export const initState = {
  login: localInfo ? true : false,
  info: localInfo ? JSON.parse(localInfo) : {}
}
export default function (state = initState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
