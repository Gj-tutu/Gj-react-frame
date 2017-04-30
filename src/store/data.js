import { Map } from 'immutable'

const DATA_INIT = 'DATA_INIT'

// 对订单和用户数据进行初始化
var dataTable = {}
var initState = function () {
  return Map()
}
var stateList = []
var initNum = 0

export function registerData (store, reducers) {
  let init = false
  for (let i = 0; i < reducers.length; i++) {
    let reducer = reducers[i]
    if (dataTable[reducer.KEY]) continue
    dataTable[reducer.KEY] = reducer.default
    if (!reducer.initState) continue
    stateList.push({ KEY: reducer.KEY, initState: reducer.initState })
    init = true
  }
  if (init) {
    store.dispatch({
      type: DATA_INIT
    })
  }
}

export default function (state = initState(), action) {
  if (action.type === DATA_INIT) {
    let num = 0
    for (let k = stateList.length - 1; k >= initNum; k--) {
      let reducer = stateList[k]
      if (state.get(reducer.KEY)) {
      } else {
        state = state.set(reducer.KEY, reducer.initState)
        num += 1
      }
    }
    initNum = initNum + num
  } else {
    let KEY = action.KEY
    if (KEY) {
      state = state.set(KEY, dataTable[KEY](state.get(KEY), action))
    }
  }
  return state
}
