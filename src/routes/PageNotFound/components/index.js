import React from 'react'
import Page from '../../../containers/Page'
import { withRouter } from 'react-router'
import { config } from '../index'
import './index.scss'

class PageNotFound extends Page {

  constructor (props) {
    super(props, config)
  }

  renderView () {
    return (
      <div className="pageNotFound">
      </div>
    )
  }
}

PageNotFound.propTypes = {
  router: React.PropTypes.object.isRequired
}

export default withRouter(PageNotFound)
