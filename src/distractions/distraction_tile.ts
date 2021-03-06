import CreateDistractionAnimation from '../anims/create_bg_anims';
import { DistractionDataContainer } from './distraction_data_container';
import { DistractionTypes } from './distraction_types';

export default class DistractionTile {
  _distractionType = DistractionTypes.Default;
  _sprite: Phaser.GameObjects.Sprite;
  _background: Phaser.GameObjects.Image;
  _scene: Phaser.Scene;
  _countdown: Phaser.Time.TimerEvent;
  _countDownBar: Phaser.GameObjects.Rectangle;
  _topLeft: Phaser.Math.Vector2;
  _topRight: Phaser.Math.Vector2;
  _width: number;
  _name: string;
  _character: Phaser.GameObjects.Image;
  _backgroundVerticalOffset: number = 10;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    name: string,
    character: string
  ) {
    this._scene = scene;
    this._name = name;
    for (const [, distractionData] of Object.entries(DistractionDataContainer)) {
      const animationName = `${distractionData.name}Animation`;
      const animationFrames = scene.textures
        .get(distractionData.name)
        .getFrameNames()
        .sort()
        .map((framename) => {
          return {
            key: distractionData.name,
            frame: framename,
          };
        });
      CreateDistractionAnimation(scene.anims, animationName, animationFrames);
    }
    this._background = this._scene.add
      .image(x, y - this._backgroundVerticalOffset, 'bgBeige')
      .setScale(0.6, 0.6);
    this._sprite = scene.add.sprite(x, y, DistractionTypes.Default);
    this._topLeft = this._background.getTopLeft();
    this._topRight = this._background.getTopRight();
    this._width = this._topRight.x - this._topLeft.x;
    this._countDownBar = this._scene.add.rectangle(
      this._topLeft.x,
      this._topLeft.y + 6,
      0,
      12,
      0x0063ff
    );
    this._updateDistractionVisuals();

    //  Make distractions  input enabled
    this._background
      .setInteractive()
      .on('pointerdown', this.emitClickEvent, this._scene);
    this._character = this._scene.add
      .image(x, y + 3.5, character)
      .setScale(0.6, 0.6);
  }

  update() {
    if (this._countdown != null) {
      let countdownProgress = this._countdown.getProgress();

      //countdown progress bar
      this._countDownBar.width = this._width - this._width * countdownProgress;
      this._countDownBar.isFilled = true;

      if (countdownProgress == 1) {
        this.emitExpiredDistractionEvent();
        this.reset();
      }
    }
  }

  isDistracted = () => {
    return this._distractionType !== DistractionTypes.Default;
  }

  //clickhandler that emits distraction on click event
  emitClickEvent = () => {
    this._scene.events.emit('distractionClick', {
      name: this._name,
      distractionType: this._distractionType,
    });
  };

  // emits expiredDistraction event when timer runs out
  emitExpiredDistractionEvent = () => {
    this._scene.events.emit('expiredDistraction');
  }

  setDistraction = (distractionType: DistractionTypes, timeIntervalInMs: number) => {
    this._distractionType = distractionType;
    this.startTimer(timeIntervalInMs);
    this._updateDistractionVisuals();
  }

  reset = () => {
    this._distractionType = DistractionTypes.Default;
    this.startTimer(0);
    this._updateDistractionVisuals();
  }

  startTimer = (timeIntervalInMs: number) => {
    this._countdown = this._scene.time.addEvent({
      delay: timeIntervalInMs,
    });
  }

  _updateDistractionVisuals = () => {
    this._sprite.setTexture(this._distractionType);
    this._sprite.play(`${this._distractionType}Animation`);
    if (this._distractionType == DistractionTypes.Default) {
      this._background.clearTint();
    } else {
      this._background.setTint(
        DistractionDataContainer[this._distractionType].color
      );
    }
  }
}
