import React from 'react'
import Page from '../../../../containers/Page'
import './index.scss'
import { config } from '../index'

export default class TemplateTest extends Page {

  constructor (props) {
    super(props, config)
  }

  renderView () {
    const { option, user } = this.props
    return (
      <div className='template-test'></div>
    )
  }
}

TemplateTest.propTypes = {
  option: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired
}
