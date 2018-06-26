import { linkTo, goBack, replaceLink } from '../../services/Tools'
import Api from '../../services/Api'
// ------------------------------------
// Constants
// ------------------------------------
export const KEY = 'base'

const REGISTER_CALL_BACK = 'REGISTER_CALL_BACK'
const CALL_BACK = 'CALL_BACK'
const CHANGE_SIZE = 'CHANGE_SIZE'
const MAKE_CLIENT = 'MAKE_CLIENT'
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
    let pageCallBack = getState().data[KEY].pageCallBack
    let needBack = getState().data[KEY].needBack
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

export function upload(path, progress, file, key) {
  return (dispatch, getState) => {
    let base = getState().data[KEY]
    return Promise.resolve().then(() => {
      if (base.uploadExpiration < new Date().getTime()) {
        return Api.request({}, { path }).then((result) => {
          dispatch({
            KEY,
            type: MAKE_CLIENT,
            payload: {
              value: result
            }
          })
        })
      }
    }).then(() => {
      if (base.uploadClient) {
        return base.uploadClient.multipartUpload(key, file, {
          progress
        })
      } else {
        throw new Error('上传失败请重试')
      }
    }).catch((err) => {
      console.log(err)
    })
  }
}

export function changeSize() {
  return (dispatch, getState) => {
    dispatch({
      KEY,
      type: CHANGE_SIZE
    })
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
  },
  [CHANGE_SIZE]: (state, action) => {
    state.pageHeight = window.document.documentElement.clientHeight
    state.pageWeight = window.document.documentElement.clientWeight
    return {
      ...state
    }
  },
  [MAKE_CLIENT]: (state, action) => {
    const result = action.payload.value
    state.uploadClient = new OSS.Wrapper({
      region: result.Region,
      accessKeyId: result.AccessKeyId,
      accessKeySecret: result.AccessKeySecret,
      stsToken: result.SecurityToken,
      bucket: result.Bucket
    })
    state.uploadExpiration = new Date(result.Expiration).getTime()
    return {
      ...state
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export const initState = {
  pageCallBack: null,
  pageInit: null,
  needBack: true,
  uploadClient: null,
  uploadExpiration: 0
}
export default function (state = initState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
