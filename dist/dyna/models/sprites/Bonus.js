import Animation from '../../../core/extensions/Animation.js'
import Sprite from '../Sprite.js'

class Bonus extends Sprite {
  constructor() {
    super(...arguments)
    this.animation = new Animation(this)
    this.frames = [0,1].map(sx => [sx, this.sy])
    this.name = 'bonus'
    this.zorder = 1
    this.blinking()
  }

  blinking() {
    this.animation.animate(this.frames, 300, true)
  }

  take() {
    this.game.sound.play('./sounds/bonus.ogg', 'bonus')
    this.remove()

    switch(this.sy) {
      case 0: return {fire: 1}
      case 1: return {bomb: 1}
      case 2: return {remote: true}
      case 3: return {speed: 1}
      case 4: return {bombpass: true}
      case 5: return {wallpass: true}
      case 6: return {vest: true}
      case 7: return {life: 1}
    }
  }
}

export default Bonus