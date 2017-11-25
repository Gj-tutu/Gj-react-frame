import React, { Component } from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'

class AppContainer extends Component {
  loadNum = 0
  constructor(props) {
    super(props)
    this.state = { overflow: false }
    this.init()
  }
  init() {
    /**
     * 初始化事件监听
     */
    window.appEvent.on('load', this.load.bind(this))
    window.appEvent.on('loaded', this.loaded.bind(this))
    window.appEvent.on('fail', this.fail.bind(this))
    window.appEvent.on('offline', this.offline.bind(this))
    window.appEvent.on('toast', this.toast.bind(this))
  }
  load(text) {
    /**
     * 加载动画
     */
    this.loadNum = this.loadNum + 1
  }
  loaded(show, text, time) {
    /**
     * 加载动画结束
     */
    this.loadNum = this.loadNum - 1
    if (this.loadNum < 0) this.loadNum = 0
    if (this.loadNum > 0) return
  }
  toast(text, time) {
    /**
     * 提示
     */
  }
  fail(text, time) {
    /**
     * 错误信息
     */
  }
  offline(text, time) {
    /**
     * 网络错误信息
     */
  }

  render() {
    const { routes, store } = this.props
    return (
      <Provider store={store}>
        <div>
          <Router history={browserHistory} children={routes} />
        </div>
      </Provider>)
  }
}
export default AppContainer
