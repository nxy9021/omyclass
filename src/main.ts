import 'phaser';

import Preloader from './scene/preloader';
import Lvl1 from './scene/lvl1';

const config = {
  type: Phaser.AUTO,
  width: 900,
  height: 640,
  scene: [Preloader, Lvl1],
};

export default new Phaser.Game(config);
