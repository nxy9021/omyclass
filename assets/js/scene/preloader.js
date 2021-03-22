export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader');
  }

  preload() {
    this.load.image('girl1', 'assets/img/girl1.png');
    this.load.image('girl2', 'assets/img/girl2.png');
    this.load.image('girl3', 'assets/img/girl3.png');
    this.load.image('girl4', 'assets/img/girl4.png');
    // this.load.spritesheet('dude', 'assets/img/dude.png', {
    //   frameWidth: 32,
    //   frameHeight: 48,
    // });
  }

  create() {
    this.scene.start('lvl1');
  }
}
