import React from 'react'
import { Link } from 'react-router'
import Page from '../../containers/Page'
import { config } from './index'
import './index.less'
export default class extends Page {
  constructor(props) {
    super(props, config)
  }
  renderView() {
    return (
      <div id='error'>
        <h3>抱歉，你访问的页面不存在</h3>
        <Link to='/'>返回首页</Link>
      </div>
    )
  }
}
