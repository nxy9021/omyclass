import Phaser from 'phaser';
import Distraction, { DistractionType } from '../distractions/distraction';

export default class Lvl1 extends Phaser.Scene {
  text: Phaser.GameObjects.Text;
  mainTimer: Phaser.Time.TimerEvent;
  heatGaugeBg: Phaser.GameObjects.Graphics;
  heatGaugeBgLightBorder: Phaser.GameObjects.Graphics;
  distractionTiles: any = {
    l1c1: Phaser.GameObjects.Sprite,
    l1c2: Phaser.GameObjects.Sprite,
    l1c3: Phaser.GameObjects.Sprite,
    l2c1: Phaser.GameObjects.Sprite,
    l2c2: Phaser.GameObjects.Sprite,
    l2c3: Phaser.GameObjects.Sprite,
  };
  // characterTiles: any = {
  //   l1c1: Phaser.GameObjects.Sprite,
  //   l1c2: Phaser.GameObjects.Sprite,
  //   l1c3: Phaser.GameObjects.Sprite,
  //   l2c1: Phaser.GameObjects.Sprite,
  //   l2c2: Phaser.GameObjects.Sprite,
  //   l2c3: Phaser.GameObjects.Sprite,
  // };
  countDownText;
  countDownBar;
  countDownColor;
  barTimerEvents = [];

  constructor() {
    super('lvl1');
  }

  conversationButtonOnClick(pointer) {
    pointer.setTint(0xfff000);
  }

  onGameTimeOver() {
    // load tryagain screen
  }

  create() {
    // background reference
    // this.add.image(460, 320, 'ref').setScale(0.6, 0.6);

    // distraction animation
    this.distractionTiles.l1c1 = new Distraction(this, 150, 196);
    this.distractionTiles.l1c1.setDistraction(DistractionType.DOTS);
    this.distractionTiles.l1c2 = new Distraction(this, 400, 196);
    this.distractionTiles.l1c3 = new Distraction(this, 650, 196);
    this.distractionTiles.l2c1 = new Distraction(this, 150, 410);
    this.distractionTiles.l2c2 = new Distraction(this, 400, 410);
    this.distractionTiles.l2c3 = new Distraction(this, 650, 410);
    this.distractionTiles.l2c3.setDistraction(DistractionType.DOTS);
    this.distractionTiles.l1c1.startTimer(10000);
    this.distractionTiles.l1c2.startTimer(5000);
    this.distractionTiles.l1c3.startTimer(2500);


    // charactors
    // this.characterTiles.l1c1 = new (this, 150, 200);
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

    let conversationButton = this.add
      .sprite(150, 570, 'conversationButton')
      .setInteractive({ cursor: 'url(assets/img/cursors/cblue.png), pointer' })
      .on('pointerdown', () =>
        this.conversationButtonOnClick(conversationButton)
      );

    //timer
    this.text = this.add
      .text(40, 40, '', {
        fontFamily: 'Roboto',
      })
      .setFontSize(20);

    this.mainTimer = this.time.delayedCall(
      60000,
      this.onGameTimeOver,
      [],
      this
    );

    //Heat Gauge bg, locationsize, linestyle, rect and fill style of heat gauge bg
    this.heatGaugeBg = this.add
      .graphics()
      .fillRect(810, 95, 34, 397)
      .lineStyle(8, 0x000000, 1)
      .strokeRoundedRect(810, 95, 34, 397, 8)
      .fillGradientStyle(0xff0000, 0xff0000, 0xffff00, 0xffff00, 0.3);

    //Heat Gauge bg light border
    this.heatGaugeBgLightBorder = this.add
      .graphics()
      .lineStyle(2, 0xffffff, 1)
      .strokeRoundedRect(805, 88, 44, 410, 10);


  }

  update() {
    //timer
    this.text.setText(
      'Time: ' + this.mainTimer.getProgress().toString().substr(0, 4)
    );
    this.distractionTiles.l1c1.updateTimer(0x0000ff);
    this.distractionTiles.l1c2.updateTimer(0xff0000);
    this.distractionTiles.l1c3.updateTimer(0xffff00);


  }
}
