/**
 * Keyboard Manager
 * 
 * [list] - list of simultaneously pressed keys
 */

class Control {
  constructor(game) {
    this.game = game
    this.list = []
    this.paused = false
    this.resume = true
    document.addEventListener('keydown', e => this.update(e, true))
    document.addEventListener('keyup', e => this.update(e, false))
    document.addEventListener('visibilitychange', e => this.toggPause())
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
      case 32: this.trigger('onSetBomb'); break
      case 80: this.toggPause(true); break
      case 49: this.trigger('n1'); break
      case 50: this.trigger('n2'); break
      case 51: this.trigger('n3'); break
      case 52: this.trigger('n4'); break
      case 53: this.trigger('n5'); break
    }
  }

  moveTo(key, pressed) {
    if(pressed) {
      this.list.push(key)
    } else {
      this.list.splice(this.list.indexOf(key), 1)
    }
    this.trigger('onChangeMove', {direction: this.list.slice(-1)[0]})
  }

  toggPause(iskey) {
    if(iskey) this.resume = !this.resume

    if(this.paused) {
      if(this.resume) {
        this.paused = false
      }
    }
    else {
      this.paused = true
    }
    this.game.system.events.trigger('onToggPause', {paused: this.paused})
  }

  trigger(name, param) {
    this.game.events.trigger(name, param)
  }
}

export default Control