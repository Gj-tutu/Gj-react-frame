import { linkTo, goBack, replaceLink } from '../../lib/Tools'

export const KEY = 'base'
const REGISTER_CALL_BACK = 'REGISTER_CALL_BACK'
const CALL_BACK = 'CALL_BACK'
export function registerCallBack(page, { init, callBack, needBack }, replace) {
  /**
   * 用于模仿原生app页面返回数据,配合callBack接口使用
   * 在跳转页面前进行注册callback
   * 之后用callback接口进行返回操作
   */
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
    let pageCallBack = getState()
      .data.get(KEY)
      .pageCallBack
    let needBack = getState()
      .data.get(KEY)
      .needBack
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

function select(page, init, needBack, replace) {
  /**
   * 封装一个跳转选择接口
   */
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(registerCallBack(page, {
        init,
        callBack: (result) => {
          if (result) {
            resolve(result)
          } else {
            reject(new Error('取消'))
          }
        },
        needBack: needBack
      }, replace))
    })
  }
}
export const action = {
  select
}
const ACTION_HANDLERS = {
  [REGISTER_CALL_BACK]: (state, action) => {
    state.pageCallBack = action.payload.callBack
    state.pageInit = action.payload.init
    state.needBack = action.payload.needBack
    return {
      ...state
    }
  },
  [CALL_BACK]: (state, action) => {
    state.pageCallBack = null
    state.pageInit = null
    state.needBack = true
    return {
      ...state
    }
  }
}
export const initState = {
  pageCallBack: null,
  pageInit: null,
  needBack: true
}
export default function (state = initState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
