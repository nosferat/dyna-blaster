import Sprite from '../modules/abstract/Sprite.js'

import Animation from '../modules/Animation.js'
import Vector from '../modules/Vector.js'

class Player extends Sprite {
  constructor() {
    super(...arguments)
    this.animation = new Animation(this)
    this.vector = new Vector()
    this.crop = [24, 24]
    this.frames = {move:[2,1,0,1]}
    this.name = 'player'
    this.ox = -4
    this.oy = -6
    this.speed = 40
    this.start = 0
    this.updatePos = true
    this.game.events.add('onChangeMove', e => this.setDirection(e))
  }

  setDirection(e) {
    this.px = Math.round(this.px) // fix: subpixel smoothing before a move
    this.py = Math.round(this.py)

    this.vector.set(e.direction, this.speed)

    switch(e.direction) {
      case 'D': this.lookAt(0); break
      case 'R': this.lookAt(1); break
      case 'L': this.lookAt(2); break
      case 'U': this.lookAt(3); break
      default:
        this.animation.stop()
        this.sx = 1
    }
  }

  lookAt(sy) {
    this.animation.animate(this.frames.move.map(sx => [sx, sy]), 180, true)
  }

  update(time) {
    this.px = this.px + (time - this.start) * this.vector.x / 1000
    this.py = this.py + (time - this.start) * this.vector.y / 1000

    this.start = time
  }
}

export default Player