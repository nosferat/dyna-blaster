import Sprite from '../modules/abstract/Sprite.js'

class Tile extends Sprite {
  constructor() {
    super(...arguments)
    this.name = 'tile'
    this.zorder = 1
  }
}

export default Tile