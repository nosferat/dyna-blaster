/**
 * Scene Manager
 */

class Scene {
  constructor(game) {
    this.game = game
    this.list = {}
    this.vars = {}
  }

  loadscene(name) {
    this.game.render.clear()
    this.game.events.clear()
    this.game.display.clear()
    this.active = this.list[name]()
    this.active.load()
    this.active.name = name
  }
}

export default Scene