import React from 'react'
import Page from '../../../containers/Page'
import './index.less'
import { config } from './index'

export default class UserLogin extends Page {

  constructor (props) {
    super(props, config)
  }

  renderView () {
    return (
      <div className='user-login'>用户登录</div>
    )
  }
}
