/**
 * Abstract Stage Class
 */

import Bloc from './sprites/Bloc.js'
import Bonus from './sprites/Bonus.js'
import Grass from './sprites/Grass.js'
import Portal from './sprites/Portal.js'
import Status from './sprites/Status.js'
import Tile from './sprites/Tile.js'
import Wall from './sprites/Wall.js'

import Ballom from './bodies/Ballom.js'
import Boyon from './bodies/Boyon.js'
import Ekutopu from './bodies/Ekutopu.js'
import Player from './bodies/Player.js'

class Stage {
  constructor(game) {
    this.game = game
    this.images = {
      ballom: './graphics/ballom.png',
      bloc: './graphics/bloc.png',
      bomb: './graphics/bomb.png',
      bonus: './graphics/bonus.png',
      boyon: './graphics/boyon.png',
      ekutopu: './graphics/ekutopu.png',
      fire: './graphics/fire.png',
      grass: './graphics/grass.png',
      player: './graphics/player.png',
      portal: './graphics/portal.png',
      status: './graphics/status.png',
      tile: './graphics/tile.png',
      wall: './graphics/wall.png',
    }
    this.game.events.add('onEnemyKilled', () => this.enemyKilled())
  }

  async load() {
    await
    this.game.display.loadImages(this.images)
    this.build()
    this.debug()
  }

  build() {
    this.addstatic()
    this.addwalls()
    this.addbonus()
    this.addenemies()
    this.addplayer()
    this.addportal()
    this.addstatus()
  }

  debug() {
    this.game.events.add('n1', () => this.game.scene.loadscene('s1'))
    this.game.events.add('n2', () => this.game.scene.loadscene('s2'))
    this.game.events.add('n3', () => this.game.scene.loadscene('s3'))
    this.game.events.add('n4', () => this.game.scene.loadscene('s4'))
    this.game.events.add('n5', () => this.game.scene.loadscene('s5'))
  }

  addstatic() {
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
    this.underwall = []

    for(let y = 0; y < cols; y++) {
    for(let x = 0; x < rows; x++) {
      switch(this.map[y][x]) {
        case 1: this.emptycell.push([x, y]); break
        case 2: this.emptycell.push([x, y]); break
      }
    }}
  }

  addwalls() {
    for(let i = 0; i < this.wallcount; i++) {      
      const coord = this.random(this.emptycell)
      this.underwall.push(coord)
      this.add(new Wall(this.game, ...coord, 0, 0))
    }
  }

  addbonus() {
    const coord = this.random(this.underwall)
    const bonus = this.bonus
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

  addenemies() {
    for(let i in this.enemies) {
      for(let count = 0; count < this.enemies[i]; count++) {
        const coord = this.random(this.emptycell)
        switch(i) {
          case 'ballom': this.add(new Ballom(this.game, ...coord, 0, 0)); break
          case 'boyon': this.add(new Boyon(this.game, ...coord, 0, 0)); break
          case 'ekutopu': this.add(new Ekutopu(this.game, ...coord, 0, 0)); break
        }
      }
    }
  }

  addplayer() {
    this.add(new Player(this.game, 2, 1, 1, 0))
  }

  addportal() {
    this.add(new Portal(this.game, ...this.random(this.underwall), 0, 0))
  }

  addstatus() {
    this.add(new Status(this.game, 0, 0, 0, 0))
  }

  enemyKilled() {
    const enemies = sprite => sprite.group === 'enemies' && sprite.isActive

    if(this.game.render.list.filter(enemies).length === 0) {
      this.game.events.trigger('onEnemiesKilled')
    }
  }

  add(sprite) {
    this.game.render.add(sprite)
  }

  random(array) {
    return array.splice(Math.intRand(0, array.length-1), 1)[0]
  }
}

export default Stage