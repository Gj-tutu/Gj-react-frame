import React from 'react'

const App = ({ children, location }) => (
  {...children}
)

App.propTypes = {
  children: React.PropTypes.object.isRequired,
  location: React.PropTypes.object.isRequired
}

export default App
