/**
 * @工具库
*/

/**
 * 深克隆
 * @data 数据
*/
export const deepClone = function (data) {
  let result = data
  if (typeof data === 'object' && data !== null) {
    result = Object.prototype.toString.call(data) === '[object Array]' ? [] : {}
    for (const prop in data) {
      result[prop] = deepClone(data[prop])
    }
  }
  return result
}

/**
 * 节流
 * @fn 执行的函数
 * @delay 间隔时间
*/
let valid = true
export const throttle = function (fn, delay = 1000) {
  if (valid) {
    valid = false
    setTimeout(() => {
      fn()
      valid = true
    }, delay)
  } else {
    return false
  }
}

/**
 * 防抖
 * @fn 执行的函数
 * @delay 间隔时间
*/
let deBounceTimer = null
export const deBounce = function (fn, delay = 1000) {
  if (deBounceTimer !== null) clearTimeout(deBounceTimer)
  deBounceTimer = setTimeout(fn, delay)
}

/**
 * 请求队列
 * @fn
 */
export class RequestQueue {
  queue = []
  insert (item) {
    this.queue.push(item)
  }

  out (item) {
    const index = this.queue.indexOf(item)
    this.queue.splice(index, 1)
  }

  clear () {
    this.queue = []
  }

  isClear () {
    return this.queue.length <= 0
  }
}
