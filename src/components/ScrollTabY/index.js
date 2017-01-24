import React, { Component } from 'react'
import './index.scss'
import Scroll from '../Scroll'

export default class ScrollTabY extends Component {

  constructor (props) {
    super(props)
    let li = props.elementList
    let elHeight = props.elementHeight
    let totalHeight = li.length * elHeight
    let showHeight = this.props.showHeight
    let elementMap = {}
    for (let e in li) {
      let element = li[e]
      if (props.actionId && props.actionId == element.id) {
        element.action = true
      } else {
        element.action = false
      }
      elementMap[element.id] = element
    }
    this.state = {
      li: li,
      h: elHeight,
      point: this.props.showId ? elementMap[this.props.showId].point : 0,
      sH: showHeight ? this.props.showHeight : window.Env.height,
      tH: totalHeight
    }
  }

  render () {
    return (
      <Scroll direction={false} elements={this.state.tH} show={this.state.sH} >
        {this.state.li.map((element, index) => {
          return (<li key={index} className={element.action ? "scroll-tab-y-sub action" : "scroll-tab-y-sub"}
            onTouchTap={() => (this.props.onTouchTap(element.id))}
            style={{ height: `${this.state.h}px`, lineHeight: `${this.state.h}px` }}>{element.name}</li>)
        })}
      </Scroll>
    )
  }
}

ScrollTabY.propTypes = {
  elementList: React.PropTypes.array.isRequired,
  elementHeight: React.PropTypes.number.isRequired,
  showHeight: React.PropTypes.number,
  showId: React.PropTypes.number,
  actionId: React.PropTypes.number,
  onTouchTap: React.PropTypes.func.isRequired
}
