import React from 'react'
import Page from '../../containers/Page'
import { config } from './index'
import './index.less'
import { loaded } from '../../services/Events'

export default class extends Page {

  constructor(props) {
    super(props, config)
  }

  initData() {
    loaded()
  }

  renderView() {
    return (
      <div id={config.key}>
        error
      </div>
    )
  }
}
