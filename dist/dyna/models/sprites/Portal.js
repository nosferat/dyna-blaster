import Animation from '../../../core/extensions/Animation.js'
import Sprite from '../Sprite.js'

class Portal extends Sprite {
  constructor() {
    super(...arguments)
    this.animation = new Animation(this)
    this.frames = [0,1].map(sx => [sx, 0])
    this.isActive = false
    this.name = 'portal'
    this.zorder = 1
    this.game.events.add('onEnemiesKilled', () => this.activate())
  }

  activate() {
    this.animation.animate(this.frames, 300, true)
    this.isActive = true
  }
}

export default Portal