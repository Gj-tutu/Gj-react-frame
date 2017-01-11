import { connect } from 'react-redux'
import { actions, page as pageKey } from '../modules'
import { data as base } from '../../../../data/base'

import page from '../components'

const mapDispatchtoProps = actions

const mapStateToProps = (state) => ({
  option: state.page.get(pageKey),
  base: state.data.get(base)
})

export default connect(mapStateToProps, mapDispatchtoProps)(page)
