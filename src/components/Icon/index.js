import React from 'react'
import './index.less'

function Icon(props) {
  const { type, className = '', color = '' } = props
  return (<i {...props} style={{color: color}} className={`${className} iconfont icon-${type}`.trim()} />)
}
export default Icon
