import React, { Component } from 'react'
import './Scroll.scss'

export default class ScrollX extends Component {

  constructor (props) {
    super(props)
    let total = props.elements
    let show = props.show
    let setting = {}
    if (window.Env.isMobile) {
      this.onTouchMove = this.onTouchMove.bind(this)
      this.onTouchEnd = this.onTouchEnd.bind(this)
      this.onTouchCancel = this.onTouchCancel.bind(this)
      setting.onTouchStart = this.onTouchStart.bind(this)
    } else {
      this.onMouseMove = this.onMouseMove.bind(this)
      this.onMouseUp = this.onMouseUp.bind(this)
      setting.onMouseDown = this.onMouseDown.bind(this)
    }
    this.state = {
      moving: false,
      ending: false,
      s: 0,
      m: this.props.point ? this.props.point : 0,
      sm: 0,
      show: show,
      total: total,
      setting: setting
    }
  }

  start (l) {
    if (this.moving) return
    this.setState({ moving: true, s: l, ending: false })
  }

  move (l) {
    if (!this.state.moving) return
    let m = this.state.sm - (this.state.s - l)
    this.setState({ m: m })
  }

  end () {
    if (!this.state.moving) return
    let ending = false
    let m = this.getPoint(this.state.m)
    if (m != this.state.m) ending = true
    this.setState({ moving: false, ending: ending, sm: m })
    if (ending) {
      setTimeout(() => {
        this.setState({ m: m })
      }, 20)
    }
  }

  getPoint (point) {
    let m = point
    let minM = -(this.state.total - this.state.show)
    let isS = false
    if (this.state.show > this.state.total) {
      isS = true
    }
    if (m > 0 || isS) m = 0
    if (!isS && m < minM) m = minM
    return m
  }

  onMouseDown (event) {
    if (window.Env.isIe && window.attachEvent) {
      window.attachEvent("mousemove", this.onMouseMove)
      window.attachEvent("mouseup", this.onMouseUp)
    } else {
      window.addEventListener("mousemove", this.onMouseMove)
      window.addEventListener("mouseup", this.onMouseUp)
    }
    if (this.props.direction) {
      this.start(event.clientX)
    } else {
      this.start(event.clientY)
    }
  }

  onMouseMove (event) {
    event.preventDefault()
    if (this.props.direction) {
      this.move(event.clientX)
    } else {
      this.move(event.clientY)
    }
  }

  onMouseUp (event) {
    event.preventDefault()
    if (window.Env.isIe && window.detachEventListener) {
      window.detachEventListener("mousemove", this.onMouseMove)
      window.detachEventListener("mouseup", this.onMouseUp)
    } else {
      window.removeEventListener("mousemove", this.onMouseMove)
      window.removeEventListener("mouseup", this.onMouseUp)
    }
    this.end()
  }

  onTouchStart (event) {
    window.addEventListener("touchmove", this.onTouchMove)
    window.addEventListener("touchcancel", this.onTouchCancel)
    window.addEventListener("touchend", this.onTouchEnd)
    if (this.props.direction) {
      this.start(event.touches[0].clientX)
    } else {
      this.start(event.touches[0].clientY)
    }
  }

  onTouchMove (event) {
    event.preventDefault()
    if (this.props.direction) {
      this.move(event.touches[0].clientX)
    } else {
      this.move(event.touches[0].clientY)
    }
  }

  onTouchEnd (event) {
    event.preventDefault()
    window.removeEventListener("touchmove", this.onTouchMove)
    window.removeEventListener("touchcancel", this.onTouchCancel)
    window.removeEventListener("touchend", this.onTouchEnd)
    this.end()
  }

  onTouchCancel (event) {
    event.preventDefault()
    this.onTouchEnd(event)
  }

  render () {
    let style = {}
    let containerStyle = {}
    if (this.props.direction) {
      containerStyle = { width: this.state.show }
      style = { width: `${this.state.total}px`,
        transform: `translateX(${this.state.m}px)`
      }
    } else {
      containerStyle = { height: this.state.show }
      style = { height: `${this.state.total}px`,
        transform: `translateY(${this.state.m}px)`
      }
    }
    if (this.state.ending) {
      style.transition = `transform 0.25s linear`
    }
    return (
      <div className="scroll-container" style={containerStyle}>
        <ul className="scroll-view" style={style}
          {...this.state.setting} >
          {[...this.props.children]}
        </ul>
      </div>
    )
  }
}

ScrollX.propTypes = {
  elements: React.PropTypes.number.isRequired,
  show: React.PropTypes.number.isRequired,
  direction: React.PropTypes.bool,
  point: React.PropTypes.number,
  children: React.PropTypes.array.isRequired
}

ScrollX.defaultProps = { direction: true }
