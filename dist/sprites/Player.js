import Sprite from '../modules/abstract/Sprite.js'

import Animation from '../modules/Animation.js'
import Collision from '../modules/Collision.js'
import Explosion from '../modules/Explosion.js'
import Vector from '../modules/Vector.js'

class Player extends Sprite {
  constructor(game) {
    super(...arguments)
    this.animation = new Animation(this)
    this.collision = new Collision()
    this.explosion = new Explosion(game)
    this.vector = new Vector()
    this.crop = [24, 24]
    this.frames = {move:[2,1,0,1]}
    this.name = 'player'
    this.obstacles = ['bloc', 'tile', 'wall']
    this.ox = -4
    this.oy = -6
    this.rounding = 14
    this.shape = [4, 6, 16, 16]
    this.speed = 40
    this.start = 0
    this.updatePos = true
    this.zorder = 2
    this.game.events.add('onSetBomb', e => this.setBomb(e))
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

  setBomb() {
    this.explosion.setBomb(this.dx, this.dy)
  }

  resetPos() {
    Object.assign(this, {dx:2, dy:1, sx:1, sy:0})
  }

  update(time) {
    this.mx = (time - this.start) * this.vector.x / 1000 // movement x
    this.my = (time - this.start) * this.vector.y / 1000

    let px = this.px + this.mx // planned position
    let py = this.py + this.my

    this.start = time

    const obstacles = this.obstacles
    const collision = this.collision.detection({px, py, shape: this.shape}, this.game.render.list, obstacles)

    if(collision.length >= 2) return  // go around only one obstacle.

    if(collision.length) {
      [px, py] = this.getAround(collision[0], px, py)
    }

    this.px = px
    this.py = py
  }

  getAround(collision, px, py) {

    if(px < this.px) { // left collision

      if(collision.top >= -this.rounding) {
        const dest = py - collision.top
        const next = py - this.mx
        py = Math.min(next, Math.round(dest))
      }
      if(collision.bottom <= this.rounding) {
        const dest = py - collision.bottom
        const next = py + this.mx
        py = Math.max(next, Math.round(dest))
      }
      px = px - collision.left
    }

    else if(py < this.py) { // top collision

      if(collision.left >= -this.rounding) {
        const dest = px - collision.left
        const next = px - this.my
        px = Math.min(next, Math.round(dest))
      }
      if(collision.right <= this.rounding) {
        const dest = px - collision.right
        const next = px + this.my
        px = Math.max(next, Math.round(dest))
      }
      py = py - collision.top
    }

    else if(px > this.px) { // right collision

      if(collision.top >= -this.rounding) {
        const dest = py - collision.top
        const next = py + this.mx
        py = Math.min(next, Math.round(dest))
      }
      if(collision.bottom <= this.rounding) {
        const dest = py - collision.bottom
        const next = py - this.mx
        py = Math.max(next, Math.round(dest))
      }
      px = px - collision.right
    }

    else if(py > this.py) { // bottom collision

      if(collision.left >= -this.rounding) {
        const dest = px - collision.left
        const next = px + this.my
        px = Math.min(next, Math.round(dest))
      }
      if(collision.right <= this.rounding) {
        const dest = px - collision.right
        const next = px - this.my
        px = Math.max(next, Math.round(dest))
      }
      py = py - collision.bottom
    }

    return [px, py]
  }
}

export default Player