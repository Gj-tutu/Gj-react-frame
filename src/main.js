import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'

/**
 * 兼容手机端处理300问题
 */
var attachFastClick = require('fastclick')
attachFastClick.attach(document.body)

/**
 * 初始化
 */
const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)
const MOUNT_NODE = document.getElementById('root')
let render = () => {
  let routes = require('./routes/index')
    .default(store)
  ReactDOM.render(<AppContainer store={store} routes={routes} />, MOUNT_NODE)
}
if (__DEV__) {
  /**
   * 开发环境处理
   */
  if (module.hot) {
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react')
        .default
      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }
    render = () => {
      try {
        renderApp()
      } catch (error) {
        renderError(error)
      }
    }
    module.hot.accept('./routes/index', () => setImmediate(() => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE)
      render()
    }))
  }
}
render()
