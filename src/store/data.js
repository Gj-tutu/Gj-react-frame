const DATA_INIT = 'DATA_INIT'

var Immutable = require('immutable')
var datas = {}
var stateList = []
var initNum = 0

export function registerData (store, reducers) {
  let init = false
  for (let i in reducers) {
    let reducer = reducers[i]
    if (datas[reducer.data]) continue
    datas[reducer.data] = reducer.default
    stateList.push({ key: reducer.data, initState: reducer.initialState })
    init = true
  }
  if (init) {
    store.dispatch({
      type: DATA_INIT
    })
  }
}

export default function (state = Immutable.Map({}), action) {
  if (action.type === DATA_INIT) {
    let num = 0
    for (let k = stateList.length - 1; k >= initNum; k--) {
      let reducer = stateList[k]
      if (state.get(reducer.key)) {
      } else {
        state = state.set(reducer.key, reducer.initState)
        num ++
      }
    }
    initNum = initNum + num
  }

  const data = action.data
  if (data) {
    return state.set(data, datas[data](state.get(data), action))
  }
  return state
}
