import React from 'react'
import { Component } from 'react'
import Common from '../lib/Common'

class Page extends Component {
  init = false
  config = {
    needLogin: false,
    anyOne: false
  }

  constructor (props, config) {
    super(props)
    this.init = false
    this.replace = false
    this.config = config
  }

  componentWillMount () {
    Common.pageInit()
    if (this.config.needLogin && !this.props.user.isLogin) return
    if (this.config.needLogin) {
      Common.pageReplace(this.config, this.props.location, this.props.user.info)
      this.replace = true
    }
    if (!this.config.anyOne && !this.props.user.info.clinicTrue) return
    this.initData()
    this.init = true
  }

  componentDidUpdate () {
    if (this.config.needLogin && !this.props.user.isLogin) return
    if (this.config.needLogin && !this.replace) Common.pageReplace(this.config, this.props.location, this.props.user.info)
    if (!this.config.anyOne && !this.props.user.info.clinicTrue) return
    if (this.init) {
      this.updateData()
    } else {
      this.initData()
      this.init = true
    }
  }

  initData () {

  }

  updateData () {

  }

  renderEmptyView () {
    return (<div></div>)
  }

  render () {
    if (this.config.needLogin && !this.props.user.isLogin) return this.renderEmptyView()
    if (!this.config.anyOne && !this.props.user.info.doctorTrue) return this.renderEmptyView()
    return this.renderView()
  }

  renderView () {
    return (<div></div>)
  }
}

export default Page
