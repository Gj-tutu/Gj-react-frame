import React from 'react'
import Page from '../../containers/Page'
import { config } from './index'
import './index.less'

export default class PageNotFound extends Page {

  constructor (props) {
    super(props, config)
  }

  renderView () {
    return (
      <div className="pageNotFound">
      </div>
    )
  }
}
