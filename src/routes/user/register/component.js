import React from 'react'
import Page from '../../../containers/Page'
import './index.less'
import { config } from './index'

export default class UserRegister extends Page {

  constructor (props) {
    super(props, config)
  }

  renderView () {
    return (
      <div className='user-register'>用户注册</div>
    )
  }
}
