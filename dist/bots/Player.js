import Body from '../modules/abstract/Body.js'

import Explosion from '../modules/Explosion.js'

class Player extends Body {
  constructor(game) {
    super(...arguments)
    this.explosion = new Explosion(game)
    this.crop = [24, 24]
    this.enemies = ['ballom', 'boyon', 'ekutopu', 'fire']
    this.frames = {move:[2,1,0,1], doom:[0,1,0,1,0,1,2,3,4,5,6,7,8].map(sx => [sx, 4])}
    this.name = 'player'
    this.obstacles = ['bloc', 'tile', 'wall']
    this.ox = -4
    this.oy = -6
    this.rounding = 14
    this.running = true
    this.shape = [4, 6, 16, 16]
    this.speed = 40
    this.zorder = 3
    this.game.events.add('onSetBomb', e => this.setBomb(e))
    this.game.events.add('onChangeMove', e => this.setDirection(e))
  }

  setDirection(e) {
    if(this.running) {

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
  }

  lookAt(sy) {
    this.animation.animate(this.frames.move.map(sx => [sx, sy]), 180, true)
  }

  setBomb() {
    if(this.running) this.explosion.setBomb(this.dx, this.dy)
  }

  destroy() {
    this.animation.animate(this.frames.doom, 150, false, () => this.reset())
    this.running = false
    this.updatePos = false
  }

  reset() {
    this.vector.set(null, 0)
    this.dx = 2
    this.dy = 1
    this.sx = 1
    this.sy = 0
    this.running = true
    this.updatePos = true
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

      if(collision.obstacles.length >= 2) return  // go around only one obstacle.

      const approximation = this.getAround(collision.obstacles[0], mx, my, this.rounding)

      px = approximation.px
      py = approximation.py
    }

    this.px = px
    this.py = py
  }
}

export default Player