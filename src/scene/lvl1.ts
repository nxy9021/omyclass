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
    this.add.image(460, 320, 'heatBg');


    // distraction animation
    this.distractionTiles.l1c1 = new Distraction(this, 150, 196);
    this.distractionTiles.l1c2 = new Distraction(this, 400, 196);
    this.distractionTiles.l1c3 = new Distraction(this, 650, 196);
    this.distractionTiles.l2c1 = new Distraction(this, 150, 410);
    this.distractionTiles.l2c2 = new Distraction(this, 400, 410);
    this.distractionTiles.l2c3 = new Distraction(this, 650, 410);

    //for demo purpose, will be moved to update later
    this.distractionTiles.l1c1.setDistraction(DistractionType.DOTS, 1000);
    this.distractionTiles.l1c2.setDistraction(DistractionType.DOTS, 3000);
    this.distractionTiles.l2c3.setDistraction(DistractionType.DOTS, 2000);
    this.distractionTiles.l2c2.setDistraction(DistractionType.DOTS, 4000);
    this.distractionTiles.l2c1.setDistraction(DistractionType.DOTS, 5000);

     //  Make distractions  input enabled
    // this.distractionTiles.setInteractive();

    //  The tiles will dispatch a 'clicked' event when they are clicked on
    // this.distractionTiles.on('clicked', this.clickHandler, this);


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

  }



  update() {
    //timer
    this.text.setText(
      'Time: ' + this.mainTimer.getProgress().toString().substr(0, 4)
    );
    //   if (this.delayCountdown != null){
    //   let countdownProgress = this.delayCountdown.getProgress();
    // };
    //  private delayCountdown: any;
    //    this.delayTimer(delayTimeIntervalInMs);


    //Updates the state of all distraction tiles every tick/frame
    Object.keys(this.distractionTiles).forEach(key => this.distractionTiles[key].update());

  }
}
