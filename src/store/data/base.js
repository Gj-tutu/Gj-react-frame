import { linkTo, goBack, replaceLink } from '../../lib/tools'
// ------------------------------------
// Constants
// ------------------------------------
export const KEY = 'base'

const REGISTER_CALL_BACK = 'REGISTER_CALL_BACK'
const CALL_BACK = 'CALL_BACK'
  // ------------------------------------
  // Actions
  // ------------------------------------

export function registerCallBack(page, { init, callBack, needBack }, replace) {
  return (dispatch, getState) => {
    dispatch({
      KEY,
      type: REGISTER_CALL_BACK,
      payload: {
        init,
        callBack,
        needBack
      }
    })
    if (replace) {
      replaceLink(page)
    } else {
      linkTo(page)
    }
  }
}

export function callBack(result) {
  return (dispatch, getState) => {
    let pageCallBack = getState().data.get(KEY).pageCallBack
    let needBack = getState().data.get(KEY).needBack
    dispatch({
      KEY,
      type: CALL_BACK
    })
    if (needBack) {
      goBack()
    }
    if (pageCallBack) {
      pageCallBack(result)
    }
  }
}

export const action = {}
  // ------------------------------------
  // Action Handlers
  // ------------------------------------
const ACTION_HANDLERS = {
  [REGISTER_CALL_BACK]: (state, action) => {
    state.pageCallBack = action.payload.callBack
    state.pageInit = action.payload.init
    state.needBack = action.payload.needBack
    return state
  },
  [CALL_BACK]: (state, action) => {
    state.pageCallBack = null
    state.pageInit = null
    state.needBack = true
    return state
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export const initState = {
  pageCallBack: null,
  pageInit: null,
  needBack: true
}
export default function(state = initState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}