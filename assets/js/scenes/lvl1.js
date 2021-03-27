export default class Lvl1 extends Phaser.Scene {
  text;
  mainTimer;
  heatGaugeBg;
  heatGaugeBgLightBorder;

  constructor() {
    super('lvl1');
  }

  create() {
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

    //cursor
    this.input.setDefaultCursor(
      'url(assets/img/cursors/cdefault.png), pointer'
    );

    //interactive bubbles
    // this.add.image(150, 570, 'blueBubble');

    let conversationButton = this.add
      .sprite(150, 570, 'blueBubble')
      .setInteractive({ cursor: 'url(assets/img/cursors/cblue.png), pointer' })
      .on('pointerdown', conversationButtonOnClick);

    // canvas auto was the solution
    // sprite.on('pointerin', function (event) {
    //   this.setTint(0xffffff);
    // });
    // sprite.on('pointerout', function (event) {
    //   this.clearTint();
    // });

    //timer
    text = this.add
      .text(40, 40, '', {
        fontFamily: 'Roboto',
      })
      .setFontSize(20);

    mainTimer = this.time.delayedCall(60000, onGameTimeOver, [], this);

    //Heat Gauge bg, locationsize, linestyle, rect and fill style of heat gauge bg
    heatGaugeBg = this.add
      .graphics()
      .fillRect(810, 95, 34, 397)
      .lineStyle(8, 0x000000, 1)
      .strokeRoundedRect(810, 95, 34, 397, 8)
      .fillGradientStyle(0xff0000, 0xff0000, 0xffff00, 0xffff00, 0.3);

    //Heat Gauge bg light border
    heatGaugeBgLightBorder = this.add
      .graphics()
      .lineStyle(2, 0xffffff, 1)
      .strokeRoundedRect(805, 88, 44, 410, 10);
  }

  update() {
    text.setText('Time: ' + mainTimer.getProgress().toString().substr(0, 4));
  }

  onGameTimeOver() {
    // load tryagain screen
  }
}
