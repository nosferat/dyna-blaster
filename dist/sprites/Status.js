import Sprite from '../modules/abstract/Sprite.js'

import Print from './Print.js'

class Status extends Sprite {
  constructor() {
    super(...arguments)
    this.crop = [256, 24]
    this.name = 'status'
    this.ox = 8
    this.oy = 0
    this.start = 0
    this.tx = 0
    this.ty = 0
    this.updatePos = true
    this.zorder = 0
    this.heart = new Print(this.game, 10, 1, {})
    this.score = new Print(this.game, 16, 1, {align:'right'})
    this.timer = new Print(this.game,  9, 1, {align:'right'})
  }

  format(time) {
    if(time < 0) time = 0

    const min = Math.floor(time / 1000 / 60)
    const sec = Math.floor(time / 1000 % 60).toString().padStart(2,0)

    return `${min}:${sec}`
  }

  update(time) {
    if(this.start === 0) this.start = time

    this.game.scene.current.timer -= time - this.start

    this.heart.text = this.game.scene.heart
    this.score.text = this.game.scene.score
    this.timer.text = this.format(this.game.scene.current.timer)

    this.start = time
  }
}

export default Status