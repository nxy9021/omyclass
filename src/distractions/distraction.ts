import Phaser from 'phaser';
import CreateDistractionAnimation from '../anims/CreateBgAnims';
import { DistractionCursorData } from './constant';
import { DistractionTypes } from './DistractionType';

export default class Distraction {
  _distractionType = DistractionTypes.default;
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
    for (const key in DistractionTypes) {
      const animationName = `${key}Animation`;
      const animationFrames = scene.textures
        .get(key)
        .getFrameNames()
        .sort()
        .map((framename) => {
          return {
            key: key,
            frame: framename,
          };
        });
      CreateDistractionAnimation(scene.anims, animationName, animationFrames);
    }
    this._background = this._scene.add.image(x, y - this._backgroundVerticalOffset, 'bgBeige').setScale(0.6, 0.6);
    this._sprite = scene.add.sprite(x, y, DistractionTypes.default);
    this._topLeft = this._background.getTopLeft();
    this._topRight = this._background.getTopRight();
    this._width = this._topRight.x - this._topLeft.x;
    this._countDownBar = this._scene.add.rectangle(this._topLeft.x, this._topLeft.y + 6, 0, 12, 0x0063ff);
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
      { name: this._name, distractionType: this._distractionType },
    );
  }



  setDistraction(distractionType: DistractionTypes, timeIntervalInMs: number) {
    this._distractionType = distractionType;
    this.startTimer(timeIntervalInMs);
    this._updateDistractionVisuals();
  }

  reset(){
    this._distractionType = DistractionTypes.default;
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
      case DistractionTypes.default:
        this._background.clearTint();
        this._sprite.setTexture(DistractionTypes.default);
        this._sprite.play(`${DistractionTypes.default}Animation`);
        break;

      case DistractionTypes.question:
        this._sprite.setTexture(DistractionTypes.question);
        this._background.setTint(DistractionCursorData[DistractionTypes.question].color);
        this._sprite.play(`${DistractionTypes.question}Animation`);
        break;

      case DistractionTypes.food:
        this._sprite.setTexture(DistractionTypes.food);
        this._background.setTint(DistractionCursorData[DistractionTypes.food].color);
        this._sprite.play(`${DistractionTypes.food}Animation`);
        break;

      case DistractionTypes.dots:
        this._sprite.setTexture(DistractionTypes.dots);
        this._background.setTint(DistractionCursorData[DistractionTypes.dots].color);
        this._sprite.play(`${DistractionTypes.dots}Animation`);
        break;

      case DistractionTypes.wakeup:
        this._sprite.setTexture(DistractionTypes.wakeup);
        this._background.setTint(DistractionCursorData[DistractionTypes.wakeup].color);
        this._sprite.play(`${DistractionTypes.wakeup}Animation`);
        break;
    }
  }
}
