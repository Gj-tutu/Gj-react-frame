import React, { Component } from 'react'
import './ScrollTabY2.scss'
import Scroll from '../Scroll'

export default class ScrollTabY2 extends Component {

  constructor (props) {
    super(props)
    let elementList = props.elementList
    let parentList = props.parentList
    let elementMap = {}
    let parentMap = {}
    let li = []
    let eLength = 0
    let pLength = 0
    let eleHeight = window.Env.ps2px(props.elementHeight)
    let parHeight = window.Env.ps2px(props.parentHeight)
    for (let e in elementList) {
      let element = elementList[e]
      if (props.actionIds && props.actionIds.indexOf(element.id) >= 0) {
        element.action = true
      } else {
        element.action = false
      }
      elementMap[element.id] = element
    }
    for (let p in parentList) {
      let parent = parentList[p]
      parentMap[parent.id] = parent
      li.push({ id: parent.id, type: "parent", name: parent.name })
      parent.point = eLength * eleHeight + pLength * parHeight
      pLength = pLength + 1
      for (let e in parent.elements) {
        let element = elementMap[parent.elements[e]]
        li.push({ id: element.id, type: "element", name: element.name, action: element.action })
        element['point'] = eLength * eleHeight + pLength * parHeight
        eLength = eLength + 1
      }
    }
    let totalHeight = eLength * eleHeight + pLength * parHeight
    let showHeight = this.props.showHeight
    this.state = {
      elementMap: elementMap,
      parentMap: parentMap,
      li: li,
      eh: eleHeight,
      ph: parHeight,
      point: this.props.showId ? parentMap[this.props.showId].point : 0,
      sH: showHeight ? window.Env.ps2px(this.props.showHeight) : window.Env.height,
      tH: totalHeight
    }
  }

  render () {
    return (
      <Scroll direction={false} elements={this.state.tH} show={this.state.sH} showPoint={this.state.point} >
        {this.state.li.map((element, index) => {
          if (element.type == "element") {
            return (<li key={index} className={element.action ? "scroll-tab-y2-sub action" : "scroll-tab-y2-sub"}
                        onTouchTap={() => (this.props.onSubClick(element.id))}
                        style={{ height: `${this.state.eh}px`, lineHeight: `${this.state.eh}px` }}>{element.name}</li>)
          } else {
            return (<li key={index} className="scroll-tab-y2-par"
                        onTouchTap={() => (this.props.onParClick(element.id))}
                        style={{ height: `${this.state.ph}px`, lineHeight: `${this.state.ph}px` }}>{element.name}</li>)
          }
        })}
      </Scroll>
    )
  }
}

ScrollTabY2.propTypes = {
  elementList: React.PropTypes.array.isRequired,
  parentList: React.PropTypes.array.isRequired,
  elementHeight: React.PropTypes.number.isRequired,
  parentHeight: React.PropTypes.number.isRequired,
  showHeight: React.PropTypes.number,
  showId: React.PropTypes.number,
  actionIds: React.PropTypes.array,
  onSubClick: React.PropTypes.func.isRequired,
  onParClick: React.PropTypes.func.isRequired
}
