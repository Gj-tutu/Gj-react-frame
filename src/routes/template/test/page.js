import React from 'react'
import Page from '../../../containers/Page'
import './index.less'
import { config } from './index'

export default class TemplateTest extends Page {

  constructor (props) {
    super(props, config)
  }

  renderView () {
    return (
      <div className='template-test'></div>
    )
  }
}
