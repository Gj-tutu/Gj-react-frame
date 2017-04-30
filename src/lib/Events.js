import Env from './Env'
window.Env = Env
  // 事件列表
export function load() {
  eventEmit('load')
}
export function loaded(show, text, time) {
  eventEmit('loaded', show, text, time)
}
export function toast(text, time) {
  eventEmit('toast', text, time)
}
export function fail(text, time) {
  eventEmit('fail', text, time)
}
export function offline() {
  eventEmit('offline')
}
export function todayUpdate(store_id) {
  eventEmit('todayUpdate', store_id)
}

function changeDate() {
  eventEmit('changeDate')
}

let date = new Date().format()
  // 10分钟查询一次日期是否有变更
setInterval(() => {
  let newDate = new Date().format()
  if (newDate !== date) {
    changeDate()
    date = newDate
  }
}, 10 * 60 * 60 * 1000)

function eventEmit(...values) {
  if (__DEBUG__) console.log(...values)
  window.appEvent.emit(...values)
}