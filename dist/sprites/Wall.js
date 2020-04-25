import Sprite from '../modules/abstract/Sprite.js'

import Animation from '../modules/Animation.js'

class Wall extends Sprite {
  constructor() {
    super(...arguments)
    this.animation = new Animation(this)
    this.frames = [1,2,3,4,5,6,7].map(sx => [sx, 0])
    this.name = 'wall'
    this.zorder = 2
  }

  destroy() {
    this.animation.animate(this.frames, 75, false, () => this.remove())
  }
}

export default Wall