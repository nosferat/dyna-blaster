import Sprite from '../modules/abstract/Sprite.js'

class Print extends Sprite {
  constructor() {
    super(...arguments)
    this.color = 'white'
    this.font = '7px Dyna Main'
    this.lx = 0
    this.ly = 0
    this.text = ''
    this.zorder = 5
    this.game.render.add(this)
  }
}

export default Print