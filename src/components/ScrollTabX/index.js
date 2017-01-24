import React, { Component } from 'react'
import './index.scss'
import Scroll from '../Scroll'

export default class ScrollTabX extends Component {

  constructor (props) {
    super(props)
    let li = props.elementList
    let elWidth = props.elementWidth
    let totalWidth = li.length * elWidth
    let showWidth = this.props.showWidth
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
      w: elWidth,
      point: this.props.showId ? elementMap[this.props.showId].point : 0,
      sW: showWidth ? this.props.showWidth : window.Env.width,
      tW: totalWidth
    }
  }

  render () {
    return (
      <Scroll elements={this.state.tW} show={this.state.sW} >
        {this.state.li.map((element, index) => {
          return (<li key={index} className={element.action ? "scroll-tab-x-sub action" : "scroll-tab-x-sub"}
            onTouchTap={() => (this.props.onTouchTap(element.id))}
            style={{ width: `${this.state.w}px` }}>{element.name}</li>)
        })}
      </Scroll>
    )
  }
}

ScrollTabX.propTypes = {
  elementList: React.PropTypes.array.isRequired,
  elementWidth: React.PropTypes.number.isRequired,
  showWidth: React.PropTypes.number,
  showId: React.PropTypes.number,
  actionId: React.PropTypes.number,
  onTouchTap: React.PropTypes.func.isRequired
}
