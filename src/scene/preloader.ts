import Phaser from 'phaser';
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

    //default
    this.load.animation(
      'default',
      'assets/img/distractions/default.json',
    );

    this.load.atlas(
      'default',
      'assets/img/distractions/default.png',
      'assets/img/distractions/default.json'
    );

    //question
    this.load.animation(
      'question',
      'assets/img/distractions/question.json',
    );

    this.load.atlas(
      'question',
      'assets/img/distractions/question.png',
      'assets/img/distractions/question.json'
    );



    // charactors
    this.load.image('boy1', 'assets/img/charactors/boy1.png');
    this.load.image('boy2', 'assets/img/charactors/boy2.png');
    this.load.image('girl1', 'assets/img/charactors/girl1.png');
    this.load.image('girl2', 'assets/img/charactors/girl2.png');
    this.load.image('girl3', 'assets/img/charactors/girl3.png');
    this.load.image('girl4', 'assets/img/charactors/girl4.png');

    // attention bubbles
    this.load.image('conversationButton', 'assets/img/bubbles/bblue.png');

    // cursor
    this.load.image('cursorDefault', 'assets/img/cursors/cdefault.png');
  }

  create() {
    this.scene.start('lvl1');
  }
}
