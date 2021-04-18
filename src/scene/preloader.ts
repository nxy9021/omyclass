import Phaser from 'phaser';
import { CharacterTextureNames } from '../characters/characters';
import { DistractionCursorData, DistractionTextureNames } from '../distractions/constant';

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

    // heatgauge forground
    this.load.image('heatImg', 'assets/img/heatgauge.png');


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

    // characters
    Object.keys(CharacterTextureNames).forEach((key) => {
      const name = CharacterTextureNames[key];
      this.load.image(name, `assets/img/charactors/${name}.png`);
    });

    // attention bubbles
    Object.keys(DistractionTextureNames).forEach((key) => {
      this.load.image(`${DistractionTextureNames[key]}Button`, DistractionCursorData[key].button);
    })
  }

  create() {
    this.scene.start('lvl1');
  }
}
