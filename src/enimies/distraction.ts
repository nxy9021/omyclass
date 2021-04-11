import Phaser from 'phaser';
import CreateDistractionAnimation from '../anims/CreateDefaultAnims';

export const DistractionType = {
  DEFAULT: 0,
  QUESTION: 1,
  WAKEUP: 2,
  EAT: 3,
  RESOLVE: 4,
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
  _distractionTextureNames: any;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    //Mando did this
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

    this._sprite = scene.add.sprite(x, y, DistractionTextureNames.default);
    this._sprite.play('defaultAnimation');
  }

  getDistraction = () => this._distractionType;

  setDistraction(distractionType: number) {
    this._distractionType = distractionType;

    switch (this._distractionType) {
      case DistractionType.DEFAULT:
        this._sprite.setTexture(DistractionTextureNames.default);
        this._sprite.play('defaultAnimation');
        break;

      case DistractionType.QUESTION:
        this._sprite.setTexture(DistractionTextureNames.question);
        this._sprite.play('questionAnimation');
        break;

      case DistractionType.WAKEUP:
        this._sprite.setTexture(DistractionTextureNames.question);
        break;

      case DistractionType.EAT:
        break;
    }
  }
}
