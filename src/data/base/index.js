import Api from '../../lib/Api'
import ApiSetting from '../../lib/ApiSetting'
// ------------------------------------
// Constants
// ------------------------------------
export const data = 'base'
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
