/**
 * Keyboard Manager
 * 
 * list - list of simultaneously pressed keys
 */

class Cotrol {
  constructor(game) {
    this.game = game
    this.list = []
    document.addEventListener('keydown', e => this.update(e, true))
    document.addEventListener('keyup', e => this.update(e, false))
  }

  update(event, pressed) {
    if(!event.repeat) {
      switch(event.keyCode) {
        case 37: this.moveTo('L', pressed); break
        case 38: this.moveTo('U', pressed); break
        case 39: this.moveTo('R', pressed); break
        case 40: this.moveTo('D', pressed); break
      }
    }
    if(!pressed) this.hotkey(event)
  }

  hotkey(event) {
    switch(event.keyCode) {
      case 49: this.loadscene('s1'); break
    }
  }

  moveTo(key, pressed) {
    if(pressed) {
      this.list.push(key)
    } else {
      this.list.splice(this.list.indexOf(key), 1)
    }

    this.game.events.trigger('onChangeMove', {
      direction: this.list.slice(-1)[0]
    })
  }

  loadscene(name) {
    this.game.scene.loadscene(name)
  }
}

export default Cotrol