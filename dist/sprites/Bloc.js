import Sprite from '../modules/abstract/Sprite.js'

class Bloc extends Sprite {
  constructor() {
    super(...arguments)
    this.name = 'bloc'
  }
}

export default Bloc