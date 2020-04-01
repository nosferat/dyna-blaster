import Stage from '../modules/abstract/Stage.js'
import Math from '../modules/addition/Math.js'

import Bloc from '../sprites/Bloc.js'
import Grass from '../sprites/Grass.js'
import Tile from '../sprites/Tile.js'
import Wall from '../sprites/Wall.js'

class Stage1 extends Stage {
  constructor() {
    super(...arguments)
    this.wallcount = 32
    this.map = [
      [12, 9, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 10],
      [12, 8, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 10],
      [12, 8, 0, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 6, 10],
      [12, 8, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 6, 10],
      [12, 8, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 6, 10],
      [12, 8, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 6, 10],
      [12, 8, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 6, 10],
      [12, 8, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 6, 10],
      [12, 8, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 6, 10],
      [12, 8, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 6, 10],
      [12, 8, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 6, 10],
      [12, 8, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 6, 10],
      [13, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 11],
    ]
    this.images = {
      bloc: '../images/bloc.png',
      bomb: '../images/bomb.png',
      grass: '../images/grass.png',
      player: '../images/player.png',
      tile: '../images/tile.png',
      wall: '../images/wall.png',
    }
  }

  build() {
    const rows = this.map[0].length
    const cols = this.map.length
    const game = this.game

    for(let y = 0; y < cols; y++) {
    for(let x = 0; x < rows; x++) {
      switch(this.map[y][x]) {
        case  0: this.add(new Grass(game, x, y, 0, 0)); break
        case  1: this.add(new Grass(game, x, y, 0, 0)); break
        case  2: this.add(new Grass(game, x, y, 1, 0)); break
        case  3: this.add(new Bloc(game, x, y, 0, 0)); break
        case  4: this.add(new Tile(game, x, y, 2, 0)); break
        case  5: this.add(new Tile(game, x, y, 3, 0)); break
        case  6: this.add(new Tile(game, x, y, 3, 1)); break
        case  7: this.add(new Tile(game, x, y, 2, 4)); break
        case  8: this.add(new Tile(game, x, y, 1, 1)); break
        case  9: this.add(new Tile(game, x, y, 1, 0)); break
        case 10: this.add(new Tile(game, x, y, 4, 0)); break
        case 11: this.add(new Tile(game, x, y, 4, 4)); break
        case 12: this.add(new Tile(game, x, y, 0, 0)); break
        case 13: this.add(new Tile(game, x, y, 0, 4)); break
      }
    }}

    this.getwalls().map(item => this.add(new Wall(game, item.x, item.y, 0, 0)))
    this.add(this.game.scene.player)

    this.game.scene.player.resetPos()
  }

  getwalls() {
    const rows = this.map[0].length
    const cols = this.map.length
    const empty = []
    const walls = []

    for(let y = 0; y < cols; y++) {
    for(let x = 0; x < rows; x++) {
      switch(this.map[y][x]) {
        case 1: empty.push({x, y}); break
        case 2: empty.push({x, y}); break
      }
    }}

    for(let i = 0; i < this.wallcount; i++) {
      const rand = Math.intRand(0, empty.length - 1)
      const x = empty[rand].x
      const y = empty[rand].y
      walls.push({x, y})
      empty.splice(rand, 1)
    }
    return walls
  }
}

export default Stage1