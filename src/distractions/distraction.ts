import Phaser from 'phaser';
import CreateDistractionAnimation from '../anims/CreateBgAnims';

export const DistractionType = {
  DEFAULT: 0,
  QUESTION: 1,
  FOOD: 2,
  DOTS: 3,
  WAKEUP: 4,
};

export const DistractionTextureNames = {
  default: 'default',
  question: 'question',
  food: 'food',
  dots: 'dots',
};

export const TimerTypes = {
  defaultTimer: 'defaultTimer',
  questionTimer:'questionTimer',
  foodTimer: 'foodTimer',
  dotsTimer: 'dotsTimer',
};

export default class Distraction {
  private distractionType = DistractionType.DEFAULT;
  private sprite: Phaser.GameObjects.Sprite;
  private background: Phaser.GameObjects.Image;
  private scene: Phaser.Scene;
  private countdown: any;
  private countDownBar: Phaser.GameObjects.Rectangle = null;
  private topLeft: any;
  private topRight: any;
  private width: number;
  private backgroundVerticalOffset: number = 10;
  // private countDownBar: Phaser.GameObjects.Graphics;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    Object.keys(DistractionTextureNames).forEach((key) => {
      const spriteName = DistractionTextureNames[key];
      const animationName = `${spriteName}Animation`;
      const animationFrames = scene.textures
        .get(spriteName)
        .getFrameNames()
        .sort()
        .map((framename) => {
          return {
            key: spriteName,
            frame: framename,
          };
        });
      CreateDistractionAnimation(scene.anims, animationName, animationFrames);
    });
    this.background = scene.add.image(x, y - this.backgroundVerticalOffset, 'bgBeige').setScale(0.6, 0.6);
    this.sprite = scene.add.sprite(x, y, DistractionTextureNames.default);
    this.topLeft = this.background.getTopLeft();
    this.topRight = this.background.getTopRight();
    this.width = this.topRight.x - this.topLeft.x;
    this.countDownBar = this.scene.add.rectangle(this.topLeft.x, this.topLeft.y + 6, 0, 12);

    this.sprite.play('defaultAnimation');
  }

  startTimer(timeIntervalInMs: number) {
    this.countdown = this.scene.time.addEvent({
       delay: timeIntervalInMs,
    });
  }

  updateTimer(color: number) {
    if (this.countdown != null){
      let countdownProgress = this.countdown.getProgress();
      //TODO user test to see which option is better

      //countup progress bar

      // if (countdownProgress == 1){
      //   this.countDownBar.isFilled = false;
      // } else{
      //   this.countDownBar.width = this.width * countdownProgress;
      //   this.countDownBar.fillColor = color;
      //   this.countDownBar.isFilled = true;
      // }

      //countdown progress bar
      {
        this.countDownBar.width = this.width - this.width * countdownProgress;
        this.countDownBar.fillColor = color;
        this.countDownBar.isFilled = true;
      }
    }
  }

  getDistraction = () => this.distractionType;

  setDistraction(distractionType: number) {
    this.distractionType = distractionType;

    switch (this.distractionType) {
      case DistractionType.DEFAULT:
        this.sprite.setTexture(DistractionTextureNames.default);
        this.sprite.play(`${DistractionTextureNames.default}Animation`);
        break;

      case DistractionType.QUESTION:
        this.sprite.setTexture(DistractionTextureNames.question);
        this.background.setTint(0xf7fc00);
        this.sprite.play(`${DistractionTextureNames.question}Animation`);
        break;

      case DistractionType.FOOD:
        this.sprite.setTexture(DistractionTextureNames.food);
        this.background.setTint(0xff5a5a);
        this.sprite.play(`${DistractionTextureNames.food}Animation`);
        break;

      case DistractionType.DOTS:
        this.sprite.setTexture(DistractionTextureNames.dots);
        this.background.setTint(0x00c2ff);
        this.sprite.play(`${DistractionTextureNames.dots}Animation`);
        break;

      case DistractionType.WAKEUP:
        break;

    }
  }
}
