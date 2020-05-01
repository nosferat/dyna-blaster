import Body from '../Body.js'

import Bonuses from '../../main/Bonuses.js'
import Explosion from '../../main/Explosion.js'

class Player extends Body {
  constructor(game) {
    super(...arguments)
    this.bonuses = new Bonuses(this)
    this.explosion = new Explosion(game)
    this.crop = [24, 24]
    this.enemies = ['ballom', 'boyon', 'ekutopu', 'fire']
    this.frames = {move:[2,1,0,1], doom:[0,1,0,1,0,1,2,3,4,5,6,7,8].map(sx => [sx, 4]), teleport:[0,1,2,3]}
    this.name = 'player'
    this.obstacles = ['bloc', 'tile', 'wall']
    this.ox = -4
    this.oy = -6
    this.shape = [4, 6, 16, 16]
    this.speed = 40
    this.zorder = 4
    this.game.events.add('onSetBomb', e => this.setBomb(e))
    this.game.events.add('onChangeMove', e => this.setDirection(e))
  }

  setDirection(e) {
    if(this.isActive && !this.game.control.paused) {

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
    if(this.isActive && !this.game.control.paused) {
      this.explosion.setBomb(this.dx, this.dy)
    }
  }

  destroy() {
    this.animation.animate(this.frames.doom, 150, false, () => this.loadscene('name'))
    this.isActive = false
    this.updatePos = false
    this.game.sound.play('./sounds/dying.ogg', 'dying')
  }

  teleport(portal) {
    this.animation.animate(this.frames.teleport.map(sx => [sx, 5]), 100, true)
    this.px = this.ox + portal.px
    this.py = this.oy + portal.py // auto position
    this.isActive = false
    this.updatePos = false
    this.game.sound.play('./sounds/portal.ogg', 'portal', () => this.loadscene('next'))
  }

  loadscene(type) {
    this.game.scene.loadscene(this.game.scene.active[type])
  }

  update(time) {
    if(this.start === 0) this.start = time

    const mx = (time - this.start) * this.vector.x / 1000 // movement x
    const my = (time - this.start) * this.vector.y / 1000

    let px = this.px + mx // planned position
    let py = this.py + my

    this.start = time

    const enemies = this.enemies
    const bonus = ['bonus']
    const portal = ['portal']
    const obstacles = this.obstacles
    const collision = this.collision.detection({px, py, shape: this.shape}, {obstacles, enemies, bonus, portal})

    if(collision.enemies) {

      const overlap = this.getOverlap(collision.enemies)
      const ox = overlap.x >= this.overlap.default 
      const oy = overlap.y >= this.overlap.default

      const enemy = collision.enemies[0].target

      if(ox && oy && enemy.isActive) {
        this.destroy()
      }
    }

    if(collision.obstacles) {

      if(collision.obstacles.length >= 2) return  // go around only one obstacle.

      const approximation = this.getAround(collision.obstacles[0], mx, my, this.rounding)

      px = approximation.px
      py = approximation.py
    }

    if(collision.bonus) {

      const overlap = this.getOverlap(collision.bonus)
      const ox = overlap.x >= this.overlap.default
      const oy = overlap.y >= this.overlap.default

      if(ox && oy) {
        const bonus = collision.bonus[0].target.take()
        this.bonuses.add(bonus)
      }
    }

    if(collision.portal) {

      const overlap = this.getOverlap(collision.portal)
      const ox = overlap.x >= this.overlap.portal
      const oy = overlap.y >= this.overlap.portal

      const portal = collision.portal[0].target

      if(ox && oy && portal.isActive) {
        return this.teleport(portal)
      }
    }

    this.px = px
    this.py = py
  }
}

export default Player