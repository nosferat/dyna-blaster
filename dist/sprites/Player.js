import Sprite from '../modules/abstract/Sprite.js'

import Vector from '../modules/Vector.js'

class Player extends Sprite {
  constructor() {
    super(...arguments)
    this.vector = new Vector()
    this.crop = [24, 24]
    this.name = 'player'
    this.ox = -4
    this.oy = -6
    this.speed = 35
    this.start = 0
    this.updatePos = true
    this.game.events.add('onChangeMove', e => this.setDirection(e))
  }

  setDirection(e) {
    this.px = Math.round(this.px) // fix: subpixel smoothing before a move
    this.py = Math.round(this.py)

    this.vector.set(e.direction, this.speed)
  }

  update(time) {
    this.px = this.px + (time - this.start) * this.vector.x / 1000
    this.py = this.py + (time - this.start) * this.vector.y / 1000

    this.start = time
  }
}

export default Player