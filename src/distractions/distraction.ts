import Phaser from 'phaser';
import CreateDistractionAnimation from '../anims/CreateBgAnims';

export const DistractionType = {
  DEFAULT: 0,
  QUESTION: 1,
  FOOD: 2,
  DOTS: 3,
  // WAKEUP: 4,
};

export const DistractionTextureNames = {
  default: 'default',
  question: 'question',
  food: 'food',
  dots: 'dots',
};

export default class Distraction {
  private distractionType = DistractionType.DEFAULT;
  private sprite: Phaser.GameObjects.Sprite;
  private background: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, x: number, y: number) {
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

    this.background = scene.add.image(x, y-10, 'bgBeige').setScale(0.6, 0.6);
    this.sprite = scene.add.sprite(x, y, DistractionTextureNames.default);
    this.sprite.play('defaultAnimation');
  }

  getDistraction = () => this.distractionType;

  setDistraction(distractionType: number) {
    this.distractionType = distractionType;

    switch (this.distractionType) {
      case DistractionType.DEFAULT:
        this.sprite.setTexture(DistractionTextureNames.default);
        this.sprite.play('defaultAnimation');
        break;

      case DistractionType.QUESTION:
        this.sprite.setTexture(DistractionTextureNames.question);
        this.background.setTint(0xf7fc00);
        this.sprite.play('questionAnimation');
        break;

      case DistractionType.FOOD:
        this.sprite.setTexture(DistractionTextureNames.food);
        this.background.setTint(0xff5a5a);
        this.sprite.play('foodAnimation');
        break;

      case DistractionType.DOTS:
        this.sprite.setTexture(DistractionTextureNames.dots);
        this.background.setTint(0x00c2ff);
        this.sprite.play('dotsAnimation');
        break;
    }
  }
}
