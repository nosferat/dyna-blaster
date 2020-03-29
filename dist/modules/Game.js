/**
 * Main Router
 */

import Control from './Control.js'
import Display from './Display.js'
import Render from './Render.js'
import Scene from './Scene.js'

class Game {
  constructor(elem) {
    this.parent = document.querySelector(elem)
    this.control = new Control(this)
    this.display = new Display(this, 272, 208)
    this.render = new Render(this)
    this.scene = new Scene(this)
  }

  start() {
    this.scene.loadscene('s1')
  }
}

export default Game