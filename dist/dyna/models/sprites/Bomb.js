/**
 * [destroy] - direct call for a chain reaction
 */

import Animation from '../../../core/extensions/Animation.js'
import Sprite from '../Sprite.js'

class Bomb extends Sprite {
  constructor() {
    super(...arguments)
    this.animation = new Animation(this)
    this.frames = [1,2,0].map(sx => [sx, 0])
    this.name = 'bomb'
    this.zorder = 1
  }

  detonate(ms) {
    return new Promise(resolve => {
      this.animation.animate(this.frames, 250, true)
      this.explode = resolve
      this.timer = setTimeout(() => this.destroy(), ms)
    })
  }

  destroy() {
    clearTimeout(this.timer)
    setTimeout(() => {
      this.explode()
      this.remove()
      this.game.sound.play('./sounds/bomb.ogg', 'bomb')
    }, 100)
  }
}

export default Bomb