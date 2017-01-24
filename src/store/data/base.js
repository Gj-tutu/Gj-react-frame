import { browserHistory } from 'react-router'
// ------------------------------------
// Constants
// ------------------------------------
const dataKey = 'base'

const BASE_REGISTER_CALL_BACK = 'BASE_REGISTER_CALL_BACK'
const BASE_CALL_BACK = 'BASE_CALL_BACK'
// ------------------------------------
// Actions
// ------------------------------------

export function registerCallBack (page, { init, callBack }) {
  return (dispatch, getState) => {
    dispatch({
      data,
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
        data,
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
export const initialState = {
  pageCallBack: null,
  pageInit: null
}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
