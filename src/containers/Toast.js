import React, { Component } from 'react'

class Toast extends Component {

  constructor (props) {
    super(props)
    window.appEvent.on('load', this.load.bind(this))
    window.appEvent.on('loaded', this.loaded.bind(this))
    window.appEvent.on('toast', this.toast.bind(this))
    this.state = {
      loadNum: 0,
      loading: false,
      showOver: false,
      showToast: false,
      toastText: ''
    }
  }

  load () {
    let state = this.state
    state.loadNum ++
    state.loading = true
    this.setState({ ...state })
  }

  loaded (showOver) {
    let state = this.state
    state.loadNum --
    if (state.loadNum < 0) state.loadNum = 0
    if (state.loadNum === 0) {
      state.loading = false
      if (showOver) {
        setTimeout(() => {
          this.setState({ showOver: false })
        }, 500)
        state.showOver = true
      }
    }
    this.setState({ ...state })
  }

  toast (text) {
    let state = this.state
    setTimeout(() => {
      this.setState({ showToast: false })
    }, 500)
    state.showToast = true
    state.toastText = text
    this.setState({ ...state })
  }

  renderLoading () {
    return (this.state.loading)
      ? ''
      : ''
  }

  renderOver () {
    return (this.state.showOver)
      ? ''
      : ''
  }

  renderToast () {
    return (this.state.showToast)
      ? ''
      : ''
  }

  render () {
    return (
      <div>
        {this.renderLoading()}
        {this.renderOver()}
        {this.renderToast()}
      </div>
    )
  }
}

export default Toast
