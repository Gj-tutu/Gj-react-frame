import React from 'react'
import Page from '../../containers/Page'
import { config } from './index'
import './index.less'

export default class Error404 extends Page {

  constructor (props) {
    super(props, config)
  }

  renderView () {
    return (
      <div className="error-404">
      </div>
    )
  }
}
