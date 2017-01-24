import { connect } from 'react-redux'
import { data as base } from '../../../data/base'

import page from '../components'

const mapDispatchtoProps = {}

const mapStateToProps = (state) => ({
  base: state.data.base
})

export default connect(mapStateToProps, mapDispatchtoProps)(page)
