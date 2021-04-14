import Phaser from 'phaser';
import CreateDistractionAnimation from '../anims/CreateBgAnims';


export enum DistractionType {
  DEFAULT,
  QUESTION,
  FOOD,
  DOTS,
  WAKEUP,
};

export const DistractionTextureNames = {
  default: 'default',
  question: 'question',
  food: 'food',
  dots: 'dots',
};


export default class Distraction {
  #distractionType = DistractionType.DEFAULT;
  #sprite: Phaser.GameObjects.Sprite;
  #background: Phaser.GameObjects.Image;
  #scene: Phaser.Scene;
  #countdown: any;
  #countDownBar: Phaser.GameObjects.Rectangle = null;
  #topLeft: any;
  #topRight: any;
  #width: number;
  #backgroundVerticalOffset: number = 10;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.#scene = scene;
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
    this.#background = scene.add.image(x, y - this.#backgroundVerticalOffset, 'bgBeige').setScale(0.6, 0.6);
    this.#sprite = scene.add.sprite(x, y, DistractionTextureNames.default);
    this.#topLeft = this.#background.getTopLeft();
    this.#topRight = this.#background.getTopRight();
    this.#width = this.#topRight.x - this.#topLeft.x;
    this.#countDownBar = this.#scene.add.rectangle(this.#topLeft.x, this.#topLeft.y + 6, 0, 12, 0x0063ff);
    this._updateDistractionVisuals();
  }

   update() {


    if (this.#countdown != null){
      let countdownProgress = this.#countdown.getProgress();

      //countdown progress bar
      this.#countDownBar.width = this.#width - this.#width * countdownProgress;
      this.#countDownBar.isFilled = true;

      if (countdownProgress == 1){
        this.reset();
      }
    }
  }

   getDistraction = () => this.#distractionType;

   setDistraction(distractionType: number, timeIntervalInMs: number) {
    this.#distractionType = distractionType;
    this.startTimer(timeIntervalInMs);
    this._updateDistractionVisuals();
  }

   reset(){
    this.#distractionType = DistractionType.DEFAULT;
    this.#countdown = null;
    this._updateDistractionVisuals();
  }

  startTimer(timeIntervalInMs: number) {
    this.#countdown = this.#scene.time.addEvent(
    {
       delay: timeIntervalInMs,
    }
    );
  }


  _updateDistractionVisuals(){
    switch (this.#distractionType) {
      case DistractionType.DEFAULT:
        this.#background.clearTint();
        this.#sprite.setTexture(DistractionTextureNames.default);
        this.#sprite.play(`${DistractionTextureNames.default}Animation`);
        break;

      case DistractionType.QUESTION:
        this.#sprite.setTexture(DistractionTextureNames.question);
        this.#background.setTint(0xf7fc00);
        this.#sprite.play(`${DistractionTextureNames.question}Animation`);
        break;

      case DistractionType.FOOD:
        this.#sprite.setTexture(DistractionTextureNames.food);
        this.#background.setTint(0xff5a5a);
        this.#sprite.play(`${DistractionTextureNames.food}Animation`);
        break;

      case DistractionType.DOTS:
        this.#sprite.setTexture(DistractionTextureNames.dots);
        this.#background.setTint(0x00c2ff);
        this.#sprite.play(`${DistractionTextureNames.dots}Animation`);
        break;

      case DistractionType.WAKEUP:
        break;
    }
  }
}
