import Api from '../../lib/Api'
import ApiSetting from '../../lib/ApiSetting'
import CacheManage from '../../lib/Cache'
// ------------------------------------
// Constants
// ------------------------------------
export const data = 'base'

var tmpTime = {}
// ------------------------------------
// Actions
// ------------------------------------


export const action = {}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
}

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = {
}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
