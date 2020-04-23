import Sprite from '../modules/abstract/Sprite.js'

import Animation from '../modules/Animation.js'
import Collision from '../modules/Collision.js'
import Vector from '../modules/Vector.js'

class Ball extends Sprite {
  constructor(game) {
    super(...arguments)
    this.animation = new Animation(this)
    this.collision = new Collision(game)
    this.vector = new Vector()
    this.crop = [18, 18]
    this.enemies = ['fire']
    this.frames = {move:[1,2,1,0], doom:[0,0,1,2,3,4].map(sx => [sx, 1])}
    this.name = 'ball'
    this.obstacles = ['bloc', 'bomb', 'tile', 'wall']
    this.ox = -1
    this.oy = -2
    this.shape = [1, 2, 16, 16]
    this.speed = 18
    this.start = 0
    this.updatePos = true
    this.zorder = 2
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
    this.animation.animate(this.frames.doom, 250, false, () => this.remove())
    this.updatePos = false
  }

  update(time, sync) {
    if(this.start === 0 || sync) this.start = time
    
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
      const ox = overlap.x >= this.overlap.min
      const oy = overlap.y >= this.overlap.min

      if(ox && oy) this.destroy()
    }
    
    if(collision.obstacles) {

      const direction = ['R', 'D', 'L', 'U'][Math.intRand(0, 3)]

      this.setDirection(direction)

      if(px < this.px) px = Math.round(px - collision.obstacles[0].left)
      if(py < this.py) py = Math.round(py - collision.obstacles[0].top)
      if(px > this.px) px = Math.round(px - collision.obstacles[0].right)
      if(py > this.py) py = Math.round(py - collision.obstacles[0].bottom)
    }
    
    this.px = px
    this.py = py
  }
}

export default Ball