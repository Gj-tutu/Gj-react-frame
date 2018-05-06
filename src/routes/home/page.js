import React from 'react'
import Page from '../../containers/Page'
import './index.less'
import { config } from './index'

export default class extends Page {

  constructor(props) {
    super(props, config)
  }

  renderView() {
    return (
      <div id={config.key}>首页</div>
    )
  }
}
