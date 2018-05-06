import React, { Component } from 'react'
import { Icon, Button } from 'antd'
import './index.less'
import { uuid } from '../../services/Tools'

/**
 * demo
 * <FileUpload capture='camera' accept='image/*' onStart={() => {}} onEnd={() => {}} />
 */
export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { uploading: false, type: props.type || 'image' }
  }

  onChange = (e) => {
    this.setState({ uploading: true })
    let files = this.getFiles(e)
    let file = files[0]
    let path = this.props.type || 'other'
    let suffix = file.name.substring(file.name.lastIndexOf('.')).toLowerCase()
    let name = uuid()
    if (this.props.onStart) this.props.onStart(this.state.type == 'image' ? file.preview : file.name)
    this.props.onUpload(path, this.progress, file, `${path}/${name}${suffix}`).then((data) => {
      this.setState({ uploading: false })
      this.props.onEnd(data.url)
    }).catch((err) => {
      this.setState({ uploading: false })
      if (this.props.onError) this.props.onError(err)
    })
  }

  progress = (data) => {
    return (done) => {
      if (this.props.onProgress) this.props.onProgress(data)
      done()
    }
  }

  getFiles(e) {
    e.preventDefault()

    var files
    if (e.dataTransfer) {
      files = e.dataTransfer.files
    } else if (e.target) {
      files = e.target.files
    }
    return files
  }

  render() {
    let inputSetting = {}
    if (this.props.capture) inputSetting['capture'] = this.props.capture
    if (this.props.accept) inputSetting['accept'] = this.props.accept
    return (
      <div className={'file-upload type-' + this.state.type} style={this.props.style}>
        <input type='file'
          {...inputSetting}
          ref='fileInput' multiple={false} onChange={this.onChange} />
        {this.state.type == 'image' ? (
          this.props.src && !this.state.uploading ? (
            <img src={this.props.src} style={{width: '100%', height: '100%'}} />
          ) : (
            <Icon type={this.state.uploading ? 'loading' : 'upload'} />
          )
        ) : ''}
        {this.state.type == 'file' ? (
          <span>
            <Button style={{marginRight: 10}}>
              <Icon type={this.state.uploading ? 'loading' : 'upload'} /> 点击上传
            </Button>
            {this.props.fileName}
          </span>
        ) : ''}
      </div>
    )
  }
}
