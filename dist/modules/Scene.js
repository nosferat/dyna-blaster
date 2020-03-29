/**
 * Scene Manager
 */

import Stage1 from '../stages/Stage1.js'

class Scene {
  constructor(game) {
    this.game = game
    this.stages = {
      s1: new Stage1(game)
    }
  }

  loadscene(name) {
    this.game.render.clear()
    this.current = this.stages[name]
    this.current.load()
  }
}

export default Scene