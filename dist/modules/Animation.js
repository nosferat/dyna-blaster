class Animation {
  constructor(sprite) {
    this.sprite = sprite
    this.loop = requestAnimationFrame.bind(window)
  }

  animate(list, delay = 100, repeat = false, complete) { // init a new animation
    this.list = list
    this.delay = delay
    this.repeat = repeat
    this.frame = 0
    this.start = 0
    this.running = true
    this.complete = complete || function() {}
    this.loop(time => this.update(time))
  }

  stop() {
    this.running = false
    this.complete()
  }

  nextFrame() {
    if(this.frame < this.list.length) {
      this.sprite.sx = this.list[this.frame][0]
      this.sprite.sy = this.list[this.frame][1]
      this.frame++
    }
    else {
      if(this.repeat) {
        this.frame = 0
        this.start = 0
      }
      else {
        this.stop()
      }
    }
  }

  update(time) {
    if(this.running) {

      if(this.start === 0) {
        this.start = time
        this.nextFrame()
      }

      else if((time - this.start) >= this.delay) {
        this.start += this.delay
        this.nextFrame()
      }

      this.loop(time => this.update(time))
    }
  }
}

export default Animation