const DATA_INIT = 'DATA_INIT'

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

export default function (state = {}, action) {
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

  const data = action.data
  if (data) {
    return state[data] = datas[data](state[data], action)
  }
  return state
}
