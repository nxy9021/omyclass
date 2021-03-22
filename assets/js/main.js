// the following 2 lines are for modulize references later
// import Preloader from './scenes/preloader.js';
// import Lvl1 from './scenes/lvl1.js';

const config = {
  type: Phaser.CANVAS,
  width: 900,
  height: 640,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },

  // the following 2 lines are for modulize later
  // scene: [Preloader, Lvl1],
  // load background
};

function preload() {
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
  this.load.image('blueBubble', 'assets/img/bubbles/bblue.png');


  //   this.load.spritesheet('dude', 'assets/img/dude.png', {
  //     frameWidth: 32,
  //     frameHeight: 48,
  //   });

  // cursor
  this.load.image('cursorDefault', 'assets/img/cursors/cdefault.png');

}

function create() {
  // background reference
  // this.add.image(460, 320, 'ref').setScale(0.6, 0.6);

  // default beige background
  // lxcx: line (sequence from top) column (sequece from left)
  // write a function for handling positioning the repeated background later, so that I don't have to manually calculate it each time
  let l1c1 = this.add.image(150, 186, 'bgBeige').setScale(0.6, 0.6);
  let l1c2 = this.add.image(400, 186, 'bgBeige').setScale(0.6, 0.6);
  let l1c3 = this.add.image(650, 186, 'bgBeige').setScale(0.6, 0.6);

  let l2c1 = this.add.image(150, 400, 'bgBeige').setScale(0.6, 0.6);
  let l2c2 = this.add.image(400, 400, 'bgBeige').setScale(0.6, 0.6);
  let l2c3 = this.add.image(650, 400, 'bgBeige').setScale(0.6, 0.6);

  // book background for animation
  this.books = this.add.sprite(400, 200, 'books').setScale(0.95, 0.95);

  // sort framenames in order
  let framenames = this.textures.get('books').getFrameNames().sort();

  // see if frames are sorted in order
  // console.log(framenames);

  // For each framename, map it into animationFrame
  // phaser 3 example wants to repeatly write the following 4 lines for each animation but this is lazier
  // {
  //  "key": "books",
  //  "frame": "01_books",
  //  "duration": 0,
  //  "visible": false
  // }

  let animationFrames = framenames.map((framename) => {
    return {
      key: 'books',
      frame: framename,
    };
  });

  this.anims.create({
    key: 'booksAnimation',
    frames: animationFrames,
    frameRate: 24,
    repeat: -1,
  });

  this.books.play('booksAnimation');
  // display the array of each animationFrame
  // console.log(animationFrames);

  // charactors
  this.add.image(150, 200, 'boy1').setScale(0.6, 0.6);
  this.add.image(400, 200, 'boy2').setScale(0.6, 0.6);
  this.add.image(650, 200, 'girl1').setScale(0.6, 0.6);
  this.add.image(150, 413, 'girl2').setScale(0.6, 0.6);
  this.add.image(400, 413, 'girl3').setScale(0.6, 0.6);
  this.add.image(650, 413, 'girl4').setScale(0.6, 0.6);

  //curser
  this.input.setDefaultCursor('url(assets/img/cursors/cdefault.png), pointer');

  //interactive bubbles
  // this.add.image(150, 570, 'blueBubble');

  let sprite = this.add
    .sprite(150, 570, 'blueBubble')
    .setInteractive({ cursor: 'url(assets/img/cursors/cblue.png), pointer' });


  // doesn't work yet need to figure out why
  // sprite.on('pointerover', function () {
  //   this.setTint(0xff0000);
  // });
  // sprite.on('pointerup', function () {
  //   this.clearTint();
  // });
}


function update() {}

const game = new Phaser.Game(config);
