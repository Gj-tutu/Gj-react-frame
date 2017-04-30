import React from 'react'
import Page from '../../containers/Page'
import { config } from './index'
import './index.less'
import { loaded } from '../../lib/Events'

export default class Error404 extends Page {

  constructor (props) {
    super(props, config)
  }

  initData () {
    loaded()
  }

  renderView () {
    return (
      <div className='error-404'>
        <p><span>4</span><span>0</span><span>4</span></p>
        <p className='small'><span>页</span><span>面</span><span>不</span><span>存</span><span>在</span></p>
        <p className='small'><span>O_o</span></p>
      </div>
    )
  }
}
