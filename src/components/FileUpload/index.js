import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as request from 'superagent'

export default class FileUpload extends Component {
  constructor (props) {
    super(props)
    this.state = { uploading: false }
    this.onChange = this.onChange.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  onClick (e) {
    if (this.state.uploading) return
    var fileInput = ReactDOM.findDOMNode(this.refs.fileInput)
    fileInput.value = null
    fileInput.click()
  }

  onChange (e) {
    this.setState({ uploading: true })
    let files = this.getFiles(e)
    let file = files[0]
    file.onProgress = (e) => {
      if (!this.props.onProgress) return
      this.props.onProgress(e)
    }
    this.onUpload(file)
    this.props.onStart(file.preview)
    file.request.end((err, res) => {
      this.props.onEnd(err, res)
      this.setState({ uploading: false })
    })
  }

  getFiles (e) {
    e.preventDefault()

    var files
    if (e.dataTransfer) {
      files = e.dataTransfer.files
    } else if (e.target) {
      files = e.target.files
    }
    return files
  }

  onUpload (file) {
    file.preview = URL.createObjectURL(file)
    file.request = this.upload(file)
    return file
  }

  upload (file) {
    if (!file || file.size === 0) return null

    var r = request
      .post(this.props.uploadUrl)
      .attach(this.props.name, file, file.name)
      .set('Accept', 'application/json')
    if (file.onProgress) { r.on('progress', file.onProgress) }
    return r
  }

  render () {
    let inputSetting = {}
    if (this.props.capture) inputSetting['capture'] = this.props.capture
    if (this.props.accept) inputSetting['accept'] = this.props.accept
    return (
      <div className="file-upload" onTouchTap={this.onClick} >
        <input type="file" style={{ display: 'none' }}
          {...inputSetting}
          ref='fileInput' multiple={false} onChange={this.onChange} />
      </div>
    )
  }
}

FileUpload.propTypes = {
  name: React.PropTypes.string.isRequired,
  onEnd: React.PropTypes.func.isRequired,
  onStart: React.PropTypes.func.isRequired,
  onProgress: React.PropTypes.func,
  uploadUrl: React.PropTypes.string.isRequired,
  capture: React.PropTypes.string,
  accept: React.PropTypes.string
}
