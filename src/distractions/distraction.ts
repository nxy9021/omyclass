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

export default class Distraction {
  _distractionType = DistractionType.DEFAULT;
  _sprite: Phaser.GameObjects.Sprite;
  _background: Phaser.GameObjects.Image;
  _scene: Phaser.Scene;
  _countdown: any;
  _countDownBar: Phaser.GameObjects.Rectangle = null;
  _topLeft: any;
  _topRight: any;
  _width: number;
  _backgroundVerticalOffset: number = 10;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this._scene = scene;
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
    this._background = scene.add.image(x, y - this._backgroundVerticalOffset, 'bgBeige').setScale(0.6, 0.6);
    this._sprite = scene.add.sprite(x, y, DistractionTextureNames.default);
    this._topLeft = this._background.getTopLeft();
    this._topRight = this._background.getTopRight();
    this._width = this._topRight.x - this._topLeft.x;
    this._countDownBar = this._scene.add.rectangle(this._topLeft.x, this._topLeft.y + 6, 0, 12, 0x0063ff);
    this._updateDistractionVisuals();
  }

   update() {


    if (this._countdown != null){
      let countdownProgress = this._countdown.getProgress();

      //countdown progress bar
      this._countDownBar.width = this._width - this._width * countdownProgress;
      this._countDownBar.isFilled = true;

      if (countdownProgress == 1){
        this.reset();
      }
    }
  }

   getDistraction = () => this._distractionType;

   setDistraction(distractionType: number, timeIntervalInMs: number) {
    this._distractionType = distractionType;
    this._startTimer(timeIntervalInMs);
    this._updateDistractionVisuals();
  }

   reset(){
    this._distractionType = DistractionType.DEFAULT;
    this._countdown = null;
    this._updateDistractionVisuals();
  }

  _startTimer(timeIntervalInMs: number) {
    this._countdown = this._scene.time.addEvent(
    {
       delay: timeIntervalInMs,
    }
    );
  }


  _updateDistractionVisuals(){
    switch (this._distractionType) {
      case DistractionType.DEFAULT:
        this._background.clearTint();
        this._sprite.setTexture(DistractionTextureNames.default);
        this._sprite.play(`${DistractionTextureNames.default}Animation`);
        break;

      case DistractionType.QUESTION:
        this._sprite.setTexture(DistractionTextureNames.question);
        this._background.setTint(0xf7fc00);
        this._sprite.play(`${DistractionTextureNames.question}Animation`);
        break;

      case DistractionType.FOOD:
        this._sprite.setTexture(DistractionTextureNames.food);
        this._background.setTint(0xff5a5a);
        this._sprite.play(`${DistractionTextureNames.food}Animation`);
        break;

      case DistractionType.DOTS:
        this._sprite.setTexture(DistractionTextureNames.dots);
        this._background.setTint(0x00c2ff);
        this._sprite.play(`${DistractionTextureNames.dots}Animation`);
        break;

      case DistractionType.WAKEUP:
        break;
    }
  }
}
