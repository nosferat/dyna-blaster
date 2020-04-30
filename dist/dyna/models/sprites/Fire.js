import Animation from '../../../core/extensions/Animation.js'
import Sprite from '../Sprite.js'

class Fire extends Sprite {
  constructor() {
    super(...arguments)
    this.animation = new Animation(this)
    this.frames = [1,0,1,2,3].map(sx => [sx, this.sy])
    this.name = 'fire'
    this.zorder = 1
    this.destroy()
  }

  destroy() {
    this.animation.animate(this.frames, 75, false, () => this.remove())
  }
}

export default Fire