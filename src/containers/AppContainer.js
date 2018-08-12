import React, { Component } from 'react'
import { browserHistory, Router } from 'react-router'
import { LocaleProvider, message } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import { Provider } from 'react-redux'
import { changeSize } from '../store/data/base'

class AppContainer extends Component {
  loadKey = null
  loadNum = 0
  constructor(props) {
    super(props)
    this.init()
  }
  init() {
    /**
     * 初始化事件监听
     */
    window.appEvent.removeAllListeners()
    window.appEvent.addListener('load', this.load.bind(this))
    window.appEvent.addListener('loaded', this.loaded.bind(this))
    window.appEvent.addListener('fail', this.fail.bind(this))
    window.appEvent.addListener('toast', this.toast.bind(this))
    window.appEvent.addListener('success', this.success.bind(this))
    window.onresize = () => {
      this.props.store.dispatch(changeSize())
    }
  }
  load(text) {
    /**
     * 加载动画
     */
    this.loadNum = this.loadNum + 1
    if (!this.loadKey) {
      this.loadKey = message.loading(text || '加载中...', 0)
    }
  }
  loaded(show, text, time) {
    /**
     * 加载动画结束
     */
    this.loadNum = this.loadNum - 1
    if (this.loadNum < 0) this.loadNum = 0
    if (this.loadNum > 0) return
    if (this.loadKey) {
      this.loadKey()
      this.loadKey = null
    }
    if (show) {
      message.success(text || '提交成功!')
    }
  }
  success(text, time) {
    /**
     * 成功信息
     */
    message.success(text)
  }
  toast(text, time) {
    /**
     * 提示
     */
    message.info(text)
  }
  fail(text, time) {
    /**
     * 错误信息
     */
    message.error(text)
  }
  offline(text, time) {
    /**
     * 网络错误信息
     */
    message.error(text)
  }
  render() {
    const { routes, store } = this.props
    return (
      <Provider store={store}>
        <LocaleProvider locale={zh_CN}>
          <div>
            <Router history={browserHistory} children={routes} />
          </div>
        </LocaleProvider>
      </Provider>)
  }
}
export default AppContainer
