import Sprite from '../modules/abstract/Sprite.js'

class Bloc extends Sprite {
  constructor() {
    super(...arguments)
    this.name = 'bloc'
    this.zorder = 1
  }
}

export default Bloc