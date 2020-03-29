/**
 * Keyboard Manager
 */

class Cotrol {
  constructor(game) {
    this.game = game
    document.addEventListener('keyup', e => this.update(e))
  }

  update(event) {
    if(!event.repeat) {
      switch(event.keyCode) {
        case 49: this.loadscene('s1'); break
      }
    }
  }

  loadscene(name) {
    this.game.scene.loadscene(name)
  }
}

export default Cotrol