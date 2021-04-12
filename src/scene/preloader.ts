import Phaser from 'phaser';
import { CharacterTextureNames } from '../characters/characters';
import { DistractionTextureNames } from '../distractions/distraction';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader');
  }

  preload() {
    // background reference
    this.load.image('ref', 'assets/img/lvl1layout.png');

    // solid background
    this.load.image('bgBeige', 'assets/img/solidbg/bg_beige.png');

    // heatgauge background
    this.load.image('heatBg', 'assets/img/heatgauge_bg.png');


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
    Object.keys(CharacterTextureNames).forEach((key) => {
      const name = CharacterTextureNames[key];
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
