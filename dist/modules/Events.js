/**
 * Event Manager
 */

class Events {
  constructor() {
    this.handlers = []
  }

  add(type, fn) {
    this.handlers[type] = this.handlers[type] || []
    this.handlers[type].push(fn)
  }
  
  remove(type, fn) {
    const event = this.handlers[type] || []
    const total = event.length
    
    for(let i = 0; i < total; i++) {
      if(event[i] === fn) {
        event.splice(i, 1)
      }
    }
  }
  
  trigger(type, param) {
    const event = this.handlers[type] || []
    const total = event.length
    
    param = param || {}
    param.type = type
    
    for(let i = 0; i < total; i++) {
      event[i].call(null, param)
    }
  }
}

export default Events