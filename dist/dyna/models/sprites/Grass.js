import Sprite from '../Sprite.js'

class Grass extends Sprite {
  constructor() {
    super(...arguments)
    this.name = 'grass'
    this.zorder = 0
  }
}

export default Grass