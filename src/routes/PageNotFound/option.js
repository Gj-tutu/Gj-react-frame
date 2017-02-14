import { browserHistory } from 'react-router'
// ------------------------------------
// Constants
// ------------------------------------
export const key = 'not-found-option'
export const option = true
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
export const initState = {

}
export default function (state = initState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
