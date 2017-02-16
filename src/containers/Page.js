import React from 'react'
import { Component } from 'react'
import Common from '../lib/Common'

class Page extends Component {
  init = false
  config = {}

  constructor (props, config) {
    super(props)
    this.init = false
    this.config = config
  }

  componentWillMount () {
    Common.pageInit()
    this.initData()
    this.init = true
  }

  componentDidUpdate () {
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
    return this.renderView()
  }

  renderView () {
    return (<div></div>)
  }
}

export default Page
