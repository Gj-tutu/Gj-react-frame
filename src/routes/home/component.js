import React from 'react'
import Page from '../../containers/Page'
import './index.scss'
import { config } from '../index'

export default class Home extends Page {

  constructor (props) {
    super(props, config)
  }

  renderView () {
    return (
      <div className='home'>首页</div>
    )
  }
}

Home.propTypes = {
  base: React.PropTypes.object.isRequired
}
