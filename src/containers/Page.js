import React, { Component } from 'react'
import Common from '../lib/Common'

class Page extends Component {
  init = false
  config = {}
  constructor(props, config) {
    super(props)
    this.init = false
    this.config = config
    this.changePageInfo(config)
  }
  setTitle(title) {
    window.document.title = title
  }
  changePageInfo(config) {
    if (config.title) this.setTitle(config.title)
    try {
      let metaList = document.documentElement.getElementsByTagName('meta')
      for (let i in metaList) {
        if (metaList[i].name == 'description' && config.description) {
          metaList[i].setAttribute('content', config.description)
        } else if (metaList[i].name == 'keyword' && config.keyword) {
          metaList[i].setAttribute('content', config.keyword)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
  restart() {
    /**
     * 下次更新重新初始化页面数据
     */
    this.init = false
  }
  componentWillMount() {
    if (Common.allowInit(this.config)) {
      Common.pageInit()
      if (!this.isCallBack() || this.config.repeat) this.initData()
      this.init = true
    }
    Common.pageChangeEnd()
    this.inPage()
  }
  componentWillUpdate() {
    if (this.init) {
      this.updateData()
    } else {
      if (Common.allowInit(this.config)) {
        Common.pageInit()
        if (!this.isCallBack() || this.config.repeat) this.initData()
        this.init = true
      }
    }
  }
  componentWillUnmount() {
    this.outPage()
  }
  toTop() {

  }
  initData() {
    /**
     * 初始化数据
     */
  }
  updateData() {
    /**
     * 更新数据
     */
  }
  inPage() {
    /**
     * 进入页面
     */
  }
  outPage() {
    /**
     * 离开页面
     */
  }
  getPageHeight() {
    /**
     * 获取页面高度
     */
    return window.document.documentElement.clientHeight
  }
  getPageWidth() {
    /**
     * 获取页面宽度
     */
    return window.document.documentElement.clientWidth
  }
  isCallBack() {
    /**
     * 是否是返回页面
     */
    return Common.isCallBack
  }
  getPageNum() {
    /**
     * 获取页面堆栈
     */
    return Common.locationList.length
  }
  getLocationHistory() {
    /**
     * 获取页面历史访问
     */
    return Common.locationHistory
  }
  confirm(title, content, okText, noText, okFunc, noFunc) {
    /**
     * 确认对话框
     */
  }
  alert(title, content, text, func) {
    /**
     * 警告对话框
     */
  }
  render() {
    if (Common.allowInit(this.config)) {
      return (
        <div className={'page'}>
          {this.renderView()}
        </div>)
    } else {
      return (
        <div className={'page empty-page'}>
          {this.renderEmptyView()}
        </div>)
    }
  }
  renderView() {
    return <div />
  }
  renderEmptyView() {
    return <div />
  }
}
export default Page
