/**
 * Main Router
 */

import Control from './modules/Control.js'
import Display from './modules/Display.js'
import Events from './modules/Events.js'
import Render from './modules/Render.js'
import Scene from './modules/Scene.js'
import Sound from './modules/Sound.js'

class Game {
  constructor(elem, w, h) {
    this.parent = document.querySelector(elem),
    this.system = {
      events: new Events
    }
    this.control = new Control(this)
    this.display = new Display(this, w, h)
    this.events = new Events
    this.render = new Render(this)
    this.scene = new Scene(this)
    this.sound = new Sound
  }
}

export default Game