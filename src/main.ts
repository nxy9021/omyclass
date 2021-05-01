import 'phaser';

import Preloader from './scene/preloader';
import Start from './scene/start';
import Lvl1 from './scene/lvl1';

const config = {
  type: Phaser.AUTO,
  mode: Phaser.Scale.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  width: 900,
  height: 640,
  scene: [Preloader, Start, Lvl1],
};

export default new Phaser.Game(config);
