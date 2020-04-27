import Sprite from '../modules/abstract/Sprite.js'

import Print from './Print.js'

class Status extends Sprite {
  constructor() {
    super(...arguments)
    this.crop = [256, 24]
    this.name = 'status'
    this.ox = 8
    this.oy = 0
    this.tx = 0
    this.ty = 0
    this.updatePos = true
    this.zorder = 0
    this.heart = new Print(this.game, 10, 1, {})
    this.score = new Print(this.game, 16, 1, {align:'right'})
    this.timer = new Print(this.game,  9, 1, {align:'right'})
  }

  update(time) {
    const min = Math.floor(time / 1000 / 60)
    const sec = Math.floor(time / 1000 % 60).toString().padStart(2,0)

    this.heart.text = this.game.scene.heart
    this.score.text = this.game.scene.score
    this.timer.text = `${min}:${sec}`
  }
}

export default Status