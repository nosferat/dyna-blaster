import Sprite from '../modules/abstract/Sprite.js'

import Print from './Print.js'

class Status extends Sprite {
  constructor(game) {
    super(...arguments)
    this.crop = [256, 24]
    this.lx = 0
    this.ly = 0
    this.name = 'status'
    this.ox = 8
    this.oy = 0
    this.updatePos = true
    this.zorder = 4
    this.clock = new Print(game, 7, 1, 0, 0)
  }

  update(time) {
    const min = Math.floor(time / 1000 / 60)
    const sec = Math.floor(time / 1000 % 60).toString().padStart(2,0)

    this.clock.text = `${min}:${sec}`
  }
}

export default Status