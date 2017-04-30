import React, { Component } from 'react'
import Common, { app } from '../lib/Common'
import { goBack } from '../lib/tools'

class Page extends Component {
  init = false
  config = {}

  constructor (props, config) {
    super(props)
    this.init = false
    this.config = config
  }

  restart () {
    this.init = false
  }

  componentWillMount () {
    if (Common.allowInit(this.config)) {
      Common.pageInit()
      if (!this.isCallBack()) this.initData()
      this.init = true
    }
    Common.pageChangeEnd()
    this.inPage()
  }

  componentWillUpdate () {
    if (this.init) {
      this.updateData()
    } else {
      if (Common.allowInit(this.config)) {
        Common.pageInit()
        if (!this.isCallBack()) this.initData()
        this.init = true
      }
      Common.pageChangeEnd()
    }
  }

  componentWillUnmount () {
    this.outPage()
  }

  initData () {

  }

  updateData () {

  }

  inPage () {

  }

  outPage () {

  }

  getPageHeight () {
    return window.document.documentElement.clientHeight
  }

  getPageWidth () {
    return window.document.documentElement.clientWidth
  }

  isCallBack () {
    return Common.isCallBack
  }

  render () {
    if (Common.allowInit(this.config)) {
      return (
        <div className='page'>
          {this.renderView()}
        </div>
      )
    } else {
      return this.renderEmptyView()
    }
  }

  renderView () {
    return <div />
  }

  renderEmptyView () {
    return <div />
  }
}

export default Page
