import { CharacterTextureNames } from '../characters/characters';
import { DistractionDataContainer } from '../distractions/distractionDataContainer';

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

    // game audio
    this.load.audio('tadara', 'assets/audio/tadara.wav');
    this.load.audio('correct', 'assets/audio/correct.wav');
    this.load.audio('incorrect', 'assets/audio/wrong.wav');

    // animation background
    for (const [, distractionData] of Object.entries(DistractionDataContainer)) {
      const name = distractionData.name.toLowerCase();
      this.load.animation(name, `assets/img/distractions/${name}.json`);

      this.load.atlas(
        name,
        `assets/img/distractions/${name}.png`,
        `assets/img/distractions/${name}.json`
      );
    }

    // characters
    for (const [, textureName] of Object.entries(CharacterTextureNames)) {
      this.load.image(textureName, `assets/img/charactors/${textureName}.png`);
    };

    // attention bubbles
    for (const [, distractionData] of Object.entries(DistractionDataContainer)) {
      if (distractionData.name !== 'default') {
        this.load.image(
          `${distractionData.name}Button`,
          distractionData.button
        );
      }
    }

    // heat gauge
    this.load.image('heat_gauge', 'assets/img/heat_gauge.png');

    //TODO: load music file
  }

  create() {
    this.scene.start('lvl1');
  }
}
