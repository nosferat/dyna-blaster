import Sprite from '../modules/abstract/Sprite.js'

import Animation from '../modules/Animation.js'

class Bomb extends Sprite {
  constructor() {
    super(...arguments)
    this.animation = new Animation(this)
    this.frames = {doom:[1,2,0]}
    this.list = this.parent.bombs.list
    this.name = 'bomb'
    this.zorder = 1
    this.timer(3000)
  }

  timer(ms) {
    this.animation.animate(this.frames.doom.map(sx => [sx, 0]), 250, true)
    this.list.push(this)
    setTimeout(() => this.detonate(), ms)
  }

  detonate() {
    this.list.splice(this.list.indexOf(this), 1)
    this.remove()
  }
}

export default Bomb