import Sprite from '../modules/abstract/Sprite.js'

import Animation from '../modules/Animation.js'

class Bomb extends Sprite {
  constructor() {
    super(...arguments)
    this.animation = new Animation(this)
    this.frames = {doom:[1,2,0]}
    this.name = 'bomb'
    this.zorder = 1
  }

  detonate(ms) {
    return new Promise(resolve => {
      this.animation.animate(this.frames.doom.map(sx => [sx, 0]), 250, true)
      setTimeout(() => {resolve(); this.remove()}, ms)
    })
  }
}

export default Bomb