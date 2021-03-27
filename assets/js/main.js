import Preloader from './scenes/preloader.js';
import Lvl1 from './scenes/lvl1.js';

const config = {
  type: Phaser.AUTO,
  width: 900,
  height: 640,
  scene: [Preloader, Lvl1],
  },

const game = new Phaser.Game(config);
