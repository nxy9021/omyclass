import Phaser from 'phaser';
import CreateDistractionAnimation from '../anims/CreateBgAnims';
import { DistractionType } from './DistractionType';
import { DistractionCursorData, DistractionTextureNames } from './constant';
import { DistractionClickEvent } from './DistractionClickEvent';

export default class Distraction {
  [x: string]: any;
  _distractionType = DistractionType.DEFAULT;
  _sprite: Phaser.GameObjects.Sprite;
  _background: Phaser.GameObjects.Image;
  _scene: Phaser.Scene;
  _countdown: Phaser.Time.TimerEvent;
  _countDownBar: Phaser.GameObjects.Rectangle = null;
  _topLeft: Phaser.Math.Vector2;
  _topRight: Phaser.Math.Vector2;
  _width: number;
  _name: string;
  _character: Phaser.GameObjects.Image;
  _backgroundVerticalOffset: number = 10;

  constructor(scene: Phaser.Scene, x: number, y: number, name: string, character: string) {
    this._scene = scene;
    this._name = name;
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
    this._background = this._scene.add.image(x, y - this._backgroundVerticalOffset, 'bgBeige').setScale(0.6, 0.6);
    this._sprite = scene.add.sprite(x, y, DistractionTextureNames.default);
    this._topLeft = this._background.getTopLeft();
    this._topRight = this._background.getTopRight();
    this._width = this._topRight.x - this._topLeft.x;
    this._countDownBar = this._scene.add.rectangle(this._topLeft.x, this._topLeft.y + 6, 0, 12, 0x0063ff);
    this._emitter = new Phaser.Events.EventEmitter();
    this._updateDistractionVisuals();

    //  Make distractions  input enabled
    this._background.setInteractive().on('pointerdown', this.clickHandler, this._scene);
    this._character = this._scene.add.image(x, y + 3.5, character).setScale(0.6, 0.6);
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

//clickhandler that emits distraction on click event
  clickHandler = () => {
    this._scene.events.emit(
      'distractionClick',
      { name: this._name, distractionType: this._distractionType } as DistractionClickEvent
    );
  }

  setDistraction(distractionType: number, timeIntervalInMs: number) {
    this._distractionType = distractionType;
    this.startTimer(timeIntervalInMs);
    this._updateDistractionVisuals();
  }

  reset(){
    this._distractionType = DistractionType.DEFAULT;
    this._countdown = null;
    this._updateDistractionVisuals();
  }

  startTimer(timeIntervalInMs: number) {
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
        this._background.setTint(DistractionCursorData.question.color);
        this._sprite.play(`${DistractionTextureNames.question}Animation`);
        break;

      case DistractionType.FOOD:
        this._sprite.setTexture(DistractionTextureNames.food);
        this._background.setTint(DistractionCursorData.food.color);
        this._sprite.play(`${DistractionTextureNames.food}Animation`);
        break;

      case DistractionType.DOTS:
        this._sprite.setTexture(DistractionTextureNames.dots);
        this._background.setTint(DistractionCursorData.dots.color);
        this._sprite.play(`${DistractionTextureNames.dots}Animation`);
        break;

      case DistractionType.WAKEUP:
        this._sprite.setTexture(DistractionTextureNames.wakeup);
        this._background.setTint(DistractionCursorData.wakeup.color);
        this._sprite.play(`${DistractionTextureNames.wakeup}Animation`);
        break;
    }
  }
}
