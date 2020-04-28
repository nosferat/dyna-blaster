/**
 * Scene Manager
 */

import Stage1 from '../stages/Stage1.js'

import Player from '../bots/Player.js'

class Scene {
  constructor(game) {
    this.player = new Player(game, 2, 1, 1, 0)
    this.game = game
    this.heart = 2
    this.score = 0
    this.stages = {
      s1: function() {return new Stage1(game)}
    }
  }

  loadscene(name) {
    this.game.render.clear()
    this.current = this.stages[name]()
    this.current.load()
  }
}

export default Scene