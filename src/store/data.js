import * as account from './data/account'
import * as base from './data/base'

// 封装一个综合reducer用于处理页面级别缓存而无需建立多个reducer
const DATA_INIT = 'DATA_INIT'

// 对用户数据进行初始化
var dataTable = {
  [account.KEY]: account.default,
  [base.KEY]: base.default
}
var initState = function () {
  let userData = account.initState
  let userInfo = account.getLocal()
  userData.login = !!userInfo
  userData.info = userInfo || {}
  return {
    [account.KEY]: userData,
    [base.KEY]: base.initState
  }
}
var stateList = []
var initNum = 0
export function registerData(store, reducers) {
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
      if (!state[reducer.KEY]) {
        state[reducer.KEY] = reducer.initState
        num += 1
      }
    }
    initNum = initNum + num
  } else {
    let KEY = action.KEY
    if (KEY) {
      state[KEY] = dataTable[KEY](state[KEY], action)
    }
  }
  return {
    ...state
  }
}
