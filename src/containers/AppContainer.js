import React, { Component } from 'react'
import { hashHistory, Router } from 'react-router'
import { Provider } from 'react-redux'

class AppContainer extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { routes, store } = this.props
    return (
      <Provider store={store}>
        <div>
          <Router history={hashHistory} children={routes} />
        </div>
      </Provider>
    )
  }
}

export default AppContainer
