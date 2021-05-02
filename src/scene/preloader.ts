import { CharacterTextureNames } from '../characters/characters';
import { DistractionDataContainer } from '../distractions/distraction_data_container';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader');
  }

  preload() {
    // background reference
    this.load.image('ref', 'assets/img/lvl1layout.png');

    // level selection background
    this.load.image('selectlvlbg', 'assets/img/selectlvlbg.png');

    // instructions
    this.load.image('tutorial', 'assets/img/tutorial.png');

    // close button
    this.load.image('close', 'assets/img/close.png');

    // startnow button
    this.load.image('startnow', 'assets/img/startnow.png');

    // game titile
    this.load.image('title', 'assets/img/title.png');

    // start screen buttons
    this.load.image('start', 'assets/img/start.png');
    this.load.image('instruction', 'assets/img/instruction.png');

    // end game stars
    this.load.image('0star', 'assets/img/stars/0star.png');
    this.load.image('1star', 'assets/img/stars/1star.png');
    this.load.image('2star', 'assets/img/stars/2star.png');
    this.load.image('3star', 'assets/img/stars/3star.png');

    // level selection screen stars
    this.load.image('0starlvl', 'assets/img/stars/0starlvl.png');
    this.load.image('1starlvl', 'assets/img/stars/1starlvl.png');
    this.load.image('2starlvl', 'assets/img/stars/2starlvl.png');
    this.load.image('3starlvl', 'assets/img/stars/3starlvl.png');

    //level selection screen each level background
    this.load.image('selectedlvl', 'assets/img/selectedlvl.png');
    this.load.image('nonselectedlvl', 'assets/img/nonselectedlvl.png');
    this.load.image('lockedlvl', 'assets/img/lockedlvl.png');

    // solid background
    this.load.image('bgBeige', 'assets/img/solidbg/bg_beige.png');

    // heatgauge background
    this.load.image('heatBg', 'assets/img/heatgauge_bg.png');

    // heatgauge forground
    this.load.image('heatImg', 'assets/img/heat_gauge.png');

    // game audio
    this.load.audio('tadara', 'assets/audio/tadara.wav');
    this.load.audio('correct', 'assets/audio/correct.wav');
    this.load.audio('incorrect', 'assets/audio/wrong.wav');
    this.load.audio('bgm', 'assets/audio/bgm.wav');
    this.load.audio('countdown', 'assets/audio/countdown.wav');

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

    // combo
    this.load.image('tier1', 'assets/img/cursors/tier1.png');
    this.load.image('tier2', 'assets/img/cursors/tier2.png');
    this.load.image('tier3', 'assets/img/cursors/tier3.png');
    this.load.image('tier4', 'assets/img/cursors/tier4.png');
    this.load.image('tier5', 'assets/img/cursors/tier5.png');

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
  }

  create() {
    this.scene.start('start');
  }
}
