import Sprite from '../modules/abstract/Sprite.js'

class Wall extends Sprite {
  constructor() {
    super(...arguments)
    this.name = 'wall'
    this.zorder = 1
  }
}

export default Wall