export function load () {
  emit('load')
}
export function loaded (show) {
  emit('loaded', show)
}
export function toast (text) {
  emit('toast', text)
}

function emit (...values) {
  if (window.appEvent) window.appEvent.emit(...values)
}
