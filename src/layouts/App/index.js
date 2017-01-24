import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './index.scss'

const App = ({ children, location }) => (
  <ReactCSSTransitionGroup id="app-animation"
    component="div"
    transitionName="app-animation"
    transitionEnterTimeout={200}
    transitionLeaveTimeout={200}
  >
    {React.cloneElement(children, {
      key: location.pathname
    })}
  </ReactCSSTransitionGroup>
)

App.propTypes = {
  children: React.PropTypes.object.isRequired,
  location: React.PropTypes.object.isRequired
}

export default App
