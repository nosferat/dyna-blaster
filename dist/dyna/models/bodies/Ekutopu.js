import Body from '../Body.js'

class Ekutopu extends Body {
  constructor() {
    super(...arguments)
    this.crop = [18, 18]
    this.delay = 0
    this.frames = {move:[1,2,1,0], doom:[0,0,1,2,3,4,5,6].map(sx => [sx, 1])}
    this.group = 'enemies'
    this.name = 'ekutopu'
    this.obstacles = ['bloc', 'bomb', 'tile', 'wall']
    this.ox = -1
    this.oy = -2
    this.points = 400
    this.shape = [1, 2, 16, 16]
    this.speed = 18
    this.waiting = {min: 3000, max: 10000}
    this.lookAt()
    this.setDirection('R')
  }

  setDirection(direction) {
    this.vector.set(direction, this.speed)
  }
  
  lookAt() {
    this.animation.animate(this.frames.move.map(sx => [sx, 0]), 250, true)
  }

  destroy() {
    this.animation.animate(this.frames.doom, 250, false, () => {this.setPoints(); this.remove()})
    this.isActive = false
    this.updatePos = false
    this.game.events.trigger('onEnemyKilled', {target: this})
  }

  update(time) {
    if(this.start === 0) this.start = time
    
    const mx = (time - this.start) * this.vector.x / 1000 // movement x
    const my = (time - this.start) * this.vector.y / 1000

    let px = this.px + mx // planned position
    let py = this.py + my

    this.start = time

    const obstacles = this.obstacles
    const enemies = this.enemies
    const collision = this.collision.detection({px, py, shape: this.shape}, {obstacles, enemies})

    if(collision.enemies) {

      const overlap = this.getOverlap(collision.enemies)
      const ox = overlap.x >= this.overlap.default
      const oy = overlap.y >= this.overlap.default

      if(ox && oy) this.destroy() // min overlap passed
    }

    if(collision.obstacles) {

      const approximation = this.getAround(collision.obstacles[0], mx, my, this.rounding)

      px = approximation.px
      py = approximation.py

      if(approximation.missing) { // change direction when collision if there isn't rounding

        this.setDirection(['R', 'D', 'L', 'U'][Math.intRand(0, 3)])
      }
    }

    else if(time >= this.delay) { // сhange direction after x seconds

      this.delay = Math.intRand(
        time + this.waiting.min,
        time + this.waiting.max,
      )

      switch(this.vector.direction) {
        case 'R': this.setDirection(['D', 'U'][Math.intRand(0, 1)]); break
        case 'D': this.setDirection(['R', 'L'][Math.intRand(0, 1)]); break
        case 'L': this.setDirection(['D', 'U'][Math.intRand(0, 1)]); break
        case 'U': this.setDirection(['R', 'L'][Math.intRand(0, 1)]); break
      }
    }

    this.px = px
    this.py = py
  }
}

export default Ekutopu