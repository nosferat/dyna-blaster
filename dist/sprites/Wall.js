import Sprite from '../modules/abstract/Sprite.js'

class Wall extends Sprite {
  constructor() {
    super(...arguments)
    this.name = 'wall'
  }
}

export default Wall