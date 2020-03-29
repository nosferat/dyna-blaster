import Sprite from '../modules/abstract/Sprite.js'

class Grass extends Sprite {
  constructor() {
    super(...arguments)
    this.name = 'grass'
  }
}

export default Grass