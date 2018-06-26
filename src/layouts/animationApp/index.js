import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './index.less'

const App = ({ children, location }) => (
  <ReactCSSTransitionGroup id='app-animation'
    component='div'
    transitionName='app-animation'
    transitionEnterTimeout={200}
    transitionLeaveTimeout={200}
  >
    {React.cloneElement(children, {
      key: location.pathname
    })}
  </ReactCSSTransitionGroup>
)

export default App
