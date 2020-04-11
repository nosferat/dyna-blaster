import Sprite from '../modules/abstract/Sprite.js'

import Animation from '../modules/Animation.js'
import Collision from '../modules/Collision.js'
import Vector from '../modules/Vector.js'

class Ball extends Sprite {
  constructor() {
    super(...arguments)
    this.animation = new Animation(this)
    this.collision = new Collision()
    this.vector = new Vector()
    this.crop = [18, 18]
    this.frames = [1,2,1,0]
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
    this.animation.animate(this.frames.map(sx => [sx, 0]), 250, true)
  }

  update(time, sync) {
    if(this.start === 0 || sync) this.start = time
    
    this.mx = (time - this.start) * this.vector.x / 1000 // movement x
    this.my = (time - this.start) * this.vector.y / 1000

    let px = this.px + this.mx // planned position
    let py = this.py + this.my

    this.start = time

    const obstacles = this.obstacles
    const collision = this.collision.detection({px, py, shape: this.shape}, this.game.render.list, obstacles)

    if(collision.length) {

      const direction = ['R', 'D', 'L', 'U'][Math.intRand(0, 3)]

      this.setDirection(direction)

      if(px < this.px) px = Math.round(px - collision[0].left)
      if(py < this.py) py = Math.round(py - collision[0].top)
      if(px > this.px) px = Math.round(px - collision[0].right)
      if(py > this.py) py = Math.round(py - collision[0].bottom)
    }
    
    this.px = px
    this.py = py
  }
}

export default Ball