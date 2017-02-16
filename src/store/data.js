import * as user from './data/user'

const DATA_INIT = 'DATA_INIT'

var dataTable = {
  user: user.default
}
var initState = {
  user: user.initState
}
var stateList = []
var initNum = 0

export function registerData (store, reducers) {
  let init = false
  for (let i = 0; i < reducers.length; i++) {
    let reducer = reducers[i]
    if (dataTable[reducer.key]) continue
    dataTable[reducer.key] = reducer.default
    stateList.push({ key: reducer.key, initState: reducer.initState })
    init = true
  }
  if (init) {
    store.dispatch({
      type: DATA_INIT
    })
  }
}

export default function (state = initState, action) {
  if (action.type === DATA_INIT) {
    let num = 0
    for (let k = stateList.length - 1; k >= initNum; k--) {
      let reducer = stateList[k]
      if (state[reducer.key]) {
      } else {
        state[reducer.key] = reducer.initState
        num ++
      }
    }
    initNum = initNum + num
  }

  let key = action.key
  if (key) {
    state[key] = dataTable[key](state[key], action)
  }
  return { ...state }
}
