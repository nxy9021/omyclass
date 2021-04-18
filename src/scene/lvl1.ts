import Phaser from 'phaser';
import { CharacterTextureNames } from '../characters/character';
import Distraction, { DistractionClickEvent, DistractionCursorData, DistractionTextureNames, DistractionType } from '../distractions/distraction';
export default class Lvl1 extends Phaser.Scene {
  text: Phaser.GameObjects.Text;
  mainTimer: Phaser.Time.TimerEvent;
  distractionTiles: any = {
    l1c1: Phaser.GameObjects.Sprite,
    l1c2: Phaser.GameObjects.Sprite,
    l1c3: Phaser.GameObjects.Sprite,
    l2c1: Phaser.GameObjects.Sprite,
    l2c2: Phaser.GameObjects.Sprite,
    l2c3: Phaser.GameObjects.Sprite,
  };

  countDownText: Text;
  countDownBar: Phaser.GameObjects.Graphics;
  barTimerEvents = [];
  currentClickedDistraction: DistractionType = DistractionType.DEFAULT;

  constructor() {
    super('lvl1');
  }

  // distractionButtonOnClickHandler(pointer: Phaser.GameObjects.Sprite, color: number) {
  //   pointer.setTint(color);
  //   this.input.setDefaultCursor(`url(${data.cursor}), pointer`)
  // }

  setupDistractionButton = (distractionType: DistractionType, x: number, y: number): Phaser.GameObjects.Sprite => {
    let buttonNameString = DistractionType[distractionType].toString().toLowerCase();
    let data = DistractionCursorData[buttonNameString];
    let button = this.add
      .sprite(x, y, `${DistractionTextureNames[buttonNameString]}Button`)
      .setInteractive({ cursor: `url(${data.cursor}), pointer` })
      .on('pointerdown', () => {
        button.setTint(data.color);
        this.input.setDefaultCursor(`url(${data.cursor}), pointer`);
        this.currentClickedDistraction = distractionType;
      }
      );
      return button;
  }

  onGameTimeOver() {
    // load tryagain screen
  }

  create() {
    // background reference
    // this.add.image(460, 320, 'ref').setScale(0.6, 0.6);
    this.add.image(460, 320, 'heatBg');


    // distraction animation
    this.distractionTiles.l1c1 = new Distraction(this, 150, 196, 'l1c1', CharacterTextureNames.boy1);
    this.distractionTiles.l1c2 = new Distraction(this, 400, 196, 'l1c2', CharacterTextureNames.boy2);
    this.distractionTiles.l1c3 = new Distraction(this, 650, 196, 'l1c3', CharacterTextureNames.girl1);
    this.distractionTiles.l2c1 = new Distraction(this, 150, 410, 'l2c1', CharacterTextureNames.girl2);
    this.distractionTiles.l2c2 = new Distraction(this, 400, 410, 'l2c2', CharacterTextureNames.girl3);
    this.distractionTiles.l2c3 = new Distraction(this, 650, 410, 'l2c3', CharacterTextureNames.girl4);

    let dotsInteraction = this.setupDistractionButton(DistractionType.DOTS, 150, 570);

    //for demo purpose, will be moved to update later
    this.distractionTiles.l1c1.setDistraction(DistractionType.DOTS, 1000);
    this.distractionTiles.l1c2.setDistraction(DistractionType.QUESTION, 3000);
    this.distractionTiles.l2c3.setDistraction(DistractionType.FOOD, 2000);
    this.distractionTiles.l2c2.setDistraction(DistractionType.WAKEUP, 4000);
    this.distractionTiles.l2c1.setDistraction(DistractionType.DOTS, 5000);

    //Event listener
    // this.events.on('distractionClick', (event: DistractionClickEvent) => console.log(event.name));
    // this.events.on('distractionClick', (event: DistractionClickEvent) => console.log(event.distractionType));
    this.events.on('distractionClick', () => this.input.setDefaultCursor(`url(${DistractionCursorData.default.cursor}), pointer`));

    //cursor
    this.input.setDefaultCursor(
      'url(assets/img/cursors/cdefault.png), pointer'
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

    //Updates the state of all distraction tiles every tick/frame
    Object.keys(this.distractionTiles).forEach(key => this.distractionTiles[key].update());

  }
}
