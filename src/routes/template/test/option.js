// ------------------------------------
// Constants
// ------------------------------------
export const KEY = 'template-test-option'
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
export const initState = null
export default function (state = initState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
