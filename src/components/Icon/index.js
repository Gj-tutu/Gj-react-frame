import React from 'react'
import './index.less'

function Icon(props) {
  const { type, className = '', color = '' } = props
  return (<i {...props} style={{color: color}} className={`${className} iconfont icon-${type}`.trim()} />)
}
Icon.propTypes = {
  type: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
  color: React.PropTypes.string
}
export default Icon
