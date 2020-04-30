/**
 * Init Game
 */

import Game from '../core/Game.js'

import Stage1 from './models/stages/Stage1.js'
import Stage2 from './models/stages/Stage2.js'
import Stage3 from './models/stages/Stage3.js'
import Stage4 from './models/stages/Stage4.js'
import Stage5 from './models/stages/Stage5.js'

const game = new Game('.dyna', 272, 232); console.log(game)

game.scene.vars = {heart:2, score:0}
game.scene.list = {
  s1: function() {return new Stage1(game)},
  s2: function() {return new Stage2(game)},
  s3: function() {return new Stage3(game)},
  s4: function() {return new Stage4(game)},
  s5: function() {return new Stage5(game)},
}

game.scene.loadscene('s5')

Math.intRand = function(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min))
}