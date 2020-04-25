import Sprite from '../modules/abstract/Sprite.js'

import Animation from '../modules/Animation.js'

class Portal extends Sprite {
  constructor() {
    super(...arguments)
    this.animation = new Animation(this)
    this.frames = [0,1].map(sx => [sx, 0])
    this.name = 'portal'
    this.zorder = 1
  }

  activate() {
    this.animation.animate(this.frames, 300, true)
  }
}

export default Portal