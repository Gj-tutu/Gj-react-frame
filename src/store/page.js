const PAGE_INIT = 'PAGE_INIT'

var Immutable = require('immutable')
var pages = {}
var stateList = []
var initNum = 0

export function registerPage (store, reducers) {
  let init = false
  for (let i in reducers) {
    let reducer = reducers[i]
    if (pages[reducer.page]) return
    pages[reducer.page] = reducer.default
    stateList.push({ 'key': reducer.page, 'initState': reducer.initialState })
    init = true
  }
  if (init) {
    store.dispatch({
      type: PAGE_INIT
    })
  }
}

export default function (state = Immutable.Map({}), action) {
  if (action.type === PAGE_INIT) {
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

  const page = action.page
  if (page) {
    return state.set(page, pages[page](state.get(page), action))
  }
  return state
}
