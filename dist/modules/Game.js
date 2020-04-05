/**
 * Main Router
 */

import Control from './Control.js'
import Display from './Display.js'
import Events from './Events.js'
import Render from './Render.js'
import Scene from './Scene.js'
import Sound from './Sound.js'

class Game {
  constructor(elem) {
    this.parent = document.querySelector(elem)
    this.control = new Control(this)
    this.display = new Display(this, 272, 208)
    this.events = new Events()
    this.render = new Render(this)
    this.scene = new Scene(this)
    this.sound = new Sound()
  }

  start() {
    this.scene.loadscene('s1')
  }
}

export default Game