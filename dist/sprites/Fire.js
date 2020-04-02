import Sprite from '../modules/abstract/Sprite.js'

import Animation from '../modules/Animation.js'

class Fire extends Sprite {
  constructor() {
    super(...arguments)
    this.animation = new Animation(this)
    this.frames = {doom:[2,1,0,1,2,3]}
    this.name = 'fire'
    this.zorder = 1
    this.detonate(this.sy)
  }

  detonate(sy) {
    this.animation.animate(this.frames.doom.map(sx => [sx, sy]), 75, false, () => this.remove())
  }
}

export default Fire