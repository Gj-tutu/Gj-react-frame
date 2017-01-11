import { toast } from '../../../../lib/Events'
// ------------------------------------
// Constants
// ------------------------------------
export const page = 'template-test'
// ------------------------------------
// Actions
// ------------------------------------

export const actions = {
}
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
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
