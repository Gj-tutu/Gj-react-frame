import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import makeRootReducer from './reducers'
import { updateLocation } from './location'
// redux 基本配置
export default (initialState = {}) => {
  const middleware = [thunk]

  // debug环境下加载浏览器插件用于调试
  const composeEnhancers = __DEBUG__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose
  const store = createStore(makeRootReducer(), initialState, composeEnhancers(applyMiddleware(...middleware)))
  store.asyncReducers = {}

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store))
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }
  return store
}
