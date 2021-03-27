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
    // frame naming in json is messed up because I'm stupid and it won't work, don't forget to change other json file frame names from 1_book.png to 01_book.png
    // and don't forget to sort those frames by name

    this.load.animation('booksData', 'assets/img/books/books.json');

    this.load.atlas(
      'books',
      'assets/img/books/books.png',
      'assets/img/books/books.json'
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
