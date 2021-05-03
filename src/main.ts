import 'phaser';

import Preloader from './scene/preloader';
import Start from './scene/start';
import Lvl from './scene/lvl';
import Instructions from './scene/instructions';
import selectlvl from './scene/selectlvl';

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  width: 900,
  height: 640,
  scene: [Preloader, Start, selectlvl, Lvl, Instructions],
};

export default new Phaser.Game(config);
