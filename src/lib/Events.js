/**
 * 统一事件分发类
 */
import Env from './Env'
window.Env = Env

// 事件列表
export function load(text) {
  /**
   * load加载动画显示
   */
  eventEmit('load', text)
}
export function loaded(show, text, time) {
  /**
   * load加载动画结束,并显示成功动画
   */
  eventEmit('loaded', show, text, time)
}
export function toast(text, time) {
  /**
   * 通知
   */
  eventEmit('toast', text, time)
}
export function fail(text, time) {
  /**
   * 错误
   */
  eventEmit('fail', text, time)
}
export function offline(text, time) {
  /**
   * 网络连接错误
   */
  eventEmit('offline', text, time)
}

function eventEmit(...values) {
  window.appEvent.emit(...values)
}
