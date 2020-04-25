import Stage from '../modules/abstract/Stage.js'

import Bloc from '../sprites/Bloc.js'
import Grass from '../sprites/Grass.js'
import Tile from '../sprites/Tile.js'
import Wall from '../sprites/Wall.js'

import Ballom from '../bots/Ballom.js'
import Boyon from '../bots/Boyon.js'
import Ekutopu from '../bots/Ekutopu.js'

import Bonus from '../sprites/Bonus.js'
import Portal from '../sprites/Portal.js'

class Stage1 extends Stage {
  constructor() {
    super(...arguments)
    this.botscount = {ballom:2, boyon:1, ekutopu:1}
    this.wallcount = 32
    this.bonuses = ['bomb', 'bombpass', 'fire', 'life', 'remote', 'speed', 'vest', 'wallpass']
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
      ballom: './images/ballom.png',
      bloc: './images/bloc.png',
      bomb: './images/bomb.png',
      bonus: './images/bonus.png',
      boyon: './images/boyon.png',
      ekutopu: './images/ekutopu.png',
      fire: './images/fire.png',
      grass: './images/grass.png',
      player: './images/player.png',
      portal: './images/portal.png',
      tile: './images/tile.png',
      wall: './images/wall.png',
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

    this.emptycell = []
    this.undercell = []

    for(let y = 0; y < cols; y++) {
    for(let x = 0; x < rows; x++) {
      switch(this.map[y][x]) {
        case 1: this.emptycell.push([x, y]); break
        case 2: this.emptycell.push([x, y]); break
      }
    }}

    this.addwalls()
    this.addbonus()
    this.addbots()
    this.addportal()
    this.game.scene.player.reset()
  }

  addwalls() {
    for(let i = 0; i < this.wallcount; i++) {      
      const coord = this.posRand(this.emptycell)
      this.undercell.push(coord)
      this.add(new Wall(this.game, ...coord, 0, 0))
    }
  }

  addbonus() {
    for(let bonus of this.bonuses) {
      const coord = this.posRand(this.undercell)
      switch(bonus) {
        case 'bomb': this.add(new Bonus(this.game, ...coord, 0, 1)); break
        case 'bombpass': this.add(new Bonus(this.game, ...coord, 0, 4)); break
        case 'fire': this.add(new Bonus(this.game, ...coord, 0, 0)); break
        case 'life': this.add(new Bonus(this.game, ...coord, 0, 7)); break
        case 'remote': this.add(new Bonus(this.game, ...coord, 0, 2)); break
        case 'speed': this.add(new Bonus(this.game, ...coord, 0, 3)); break
        case 'vest': this.add(new Bonus(this.game, ...coord, 0, 6)); break
        case 'wallpass': this.add(new Bonus(this.game, ...coord, 0, 5)); break
      }
    }
  }

  addportal() {
    this.add(new Portal(this.game, ...this.posRand(this.undercell), 0, 0))
  }

  addbots() {
    for(let i in this.botscount) {
    for(let j = 0; j < this.botscount[i]; j++) {
      const coord = this.posRand(this.emptycell)
      switch(i) {
        case 'ballom': this.add(new Ballom(this.game, ...coord, 0, 0)); break
        case 'boyon': this.add(new Boyon(this.game, ...coord, 0, 0)); break
        case 'ekutopu': this.add(new Ekutopu(this.game, ...coord, 0, 0)); break
      }
    }}

    this.add(this.game.scene.player)
  }

  posRand(array) {
    const last = array.length - 1
    const rand = Math.intRand(0, last)
    return array.splice(rand, 1)[0]
  }
}

export default Stage1