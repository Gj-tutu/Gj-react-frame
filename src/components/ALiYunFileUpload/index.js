import React, { Component } from 'react'
import * as request from 'superagent'
import Api from '../../lib/Api'
import ApiSetting from '../../lib/ApiSetting'
import './index.less'

/**
 * demo
 * <FileUpload capture='camera' accept='image/*' onStart={() => {}} onEnd={() => {}} />
 */
export default class FileUpload extends Component {
  constructor (props) {
    super(props)
    this.state = { uploading: false }
    this.onChange = this.onChange.bind(this)
  }

  onChange (e) {
    this.setState({ uploading: true })
    let files = this.getFiles(e)
    let file = files[0]
    file.onProgress = (e) => {
      if (!this.props.onProgress) return
      this.props.onProgress(e)
    }
    Api.request(ApiSetting.needImageToken, {}, true, false)
      .then((data) => {
        let url = `${data.host}${data.key}`
        this.onUpload(file, data)
        this.props.onStart(file.preview)
        file.request.end((err, res) => {
          if (!err && res.ok) {
            this.props.onEnd(url)
          }
          if (err && this.props.onError) this.props.onError(err)
          this.setState({ uploading: false })
        })
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

  onUpload (file, data) {
    file.preview = URL.createObjectURL(file)
    file.request = this.upload(file, data)
    return file
  }

  upload (file, data) {
    if (!file || file.size === 0) return null

    var r = request
      .post(data.host)
    for (let i in data) {
      r.field(i, data[i])
    }
    r.attach('file', file, file.name)
      .set('Accept', 'application/json')
    if (file.onProgress) { r.on('progress', file.onProgress) }
    return r
  }

  render () {
    let inputSetting = {}
    if (this.props.capture) inputSetting['capture'] = this.props.capture
    if (this.props.accept) inputSetting['accept'] = this.props.accept
    return (
      <div className='file-upload'>
        <input type='file' style={{}}
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
  onError: React.PropTypes.func,
  uploadUrl: React.PropTypes.string.isRequired,
  capture: React.PropTypes.string,
  accept: React.PropTypes.string
}
