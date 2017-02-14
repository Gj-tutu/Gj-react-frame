import { browserHistory } from 'react-router'
// ------------------------------------
// Constants
// ------------------------------------
export const key = 'base'

const BASE_REGISTER_CALL_BACK = 'BASE_REGISTER_CALL_BACK'
const BASE_CALL_BACK = 'BASE_CALL_BACK'
// ------------------------------------
// Actions
// ------------------------------------

export function registerCallBack (page, { init, callBack }) {
  return (dispatch, getState) => {
    dispatch({
      key,
      type: BASE_REGISTER_CALL_BACK,
      payload: {
        init,
        callBack
      }
    })
    browserHistory.push(page)
  }
}

export function callBack (result) {
  return (dispatch, getState) => {
    let callBack = getState().data.get(data).pageCallBack
    if (callBack) {
      dispatch(callBack(result))
      dispatch({
        key,
        type: BASE_CALL_BACK
      })
      browserHistory.goBack()
    }
  }
}

export const action = {}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [BASE_REGISTER_CALL_BACK]: (state, action) => {
    state.pageCallBack = action.payload.callBack
    state.pageInit = action.payload.init
    return { ...state }
  },
  [BASE_CALL_BACK]: (state, action) => {
    state.pageCallBack = null
    state.pageInit = null
    return { ...state }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export const initState = {
  pageCallBack: null,
  pageInit: null
}
export default function (state = initState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
