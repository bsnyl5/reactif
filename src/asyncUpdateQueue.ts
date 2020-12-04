import { HandlerFunc } from './types'

const queue: Set<HandlerFunc> = new Set<HandlerFunc>()
let sleeping: boolean = true

export function add(fn: HandlerFunc) {
  if (queue.has(fn)) {
    return
  }
  queue.add(fn)
  if (sleeping === true) {
    sleeping = false
    setTimeout(nextTick, 0)
  }
}

export function nextTick() {
  if (queue.size) {
    queue.forEach(fn => {
      fn()
    })
    queue.clear()
    sleeping = true
  }
}
