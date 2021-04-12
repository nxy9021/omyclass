import Phaser from 'phaser';
import { CharactorTextureNames } from '../charactors/charactors';
import { DistractionTextureNames } from '../enimies/distraction';
export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader');
  }

  preload() {
    // background reference
    this.load.image('ref', 'assets/img/lvl1layout.png');

    // solid background
    this.load.image('bgBeige', 'assets/img/solidbg/bg_beige.png');
    this.load.image('bgBlue', 'assets/img/solidbg/bg_blue.png');
    this.load.image('bgGreen', 'assets/img/solidbg/bg_green.png');
    this.load.image('bgRed', 'assets/img/solidbg/bg_red.png');
    this.load.image('bgYellow', 'assets/img/solidbg/bg_yellow.png');

    // animation background
    Object.keys(DistractionTextureNames).forEach((key) => {
      const name = DistractionTextureNames[key];
      this.load.animation(name, `assets/img/distractions/${name}.json`);

      this.load.atlas(
        name,
        `assets/img/distractions/${name}.png`,
        `assets/img/distractions/${name}.json`
      );
    });

    // charactors
    Object.keys(CharactorTextureNames).forEach((key) => {
      const name = CharactorTextureNames[key];
      this.load.image(name, `assets/img/charactors/${name}.png`);
    });

    // attention bubbles
    this.load.image('conversationButton', 'assets/img/bubbles/bblue.png');

    // cursor
    this.load.image('cursorDefault', 'assets/img/cursors/cdefault.png');
  }

  create() {
    this.scene.start('lvl1');
  }
}
