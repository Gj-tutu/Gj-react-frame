const DATA_INIT = 'DATA_INIT'

var dataTable = {}
var stateList = []
var initNum = 0

export function registerData (store, reducers) {
  let init = false
  for (let i in reducers) {
    let reducer = reducers[i]
    if (dataTable[reducer.dataKey]) continue
    dataTable[reducer.dataKey] = reducer.default
    stateList.push({ key: reducer.dataKey, initState: reducer.initialState })
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

  const dataKey = action.dataKey
  if (dataKey) {
    return state[dataKey] = dataTable[dataKey](state[dataKey], action)
  }
  return { ...state }
}
