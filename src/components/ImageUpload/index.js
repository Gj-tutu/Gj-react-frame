import React, { Component } from 'react'
import FileUpload from '../FileUpload'

export default class ImageUpload extends Component {
  constructor (props) {
    super(props)
    this.onEnd = this.onEnd.bind(this)
    this.onStart = this.onStart.bind(this)
  }

  onEnd (err, res) {
    if (!err && res.ok) {
      let result = res.body
        this.props.onEnd(result)
    }
    if (err && this.props.onError) this.props.onError(err)
  }

  onStart (url) {
    this.props.onStart(url)
  }

  render () {
    return (
      <FileUpload name='uploadFormElement' capture='camera' accept='image/*'
        onEnd={this.onEnd} onStart={this.onStart}
        uploadUrl={this.props.url} />
    )
  }
}
