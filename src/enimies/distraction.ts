import Phaser from 'phaser';
import CreateDistractionAnimation from '../anims/CreateDefaultAnims';

// TODO: Move me to a file
const DistractionType = {
  DEFAULT: 0,
  QUESTION: 1,
  WAKEUP: 2,
  EAT: 3,
  RESOLVE: 4,
};

const DistractionTextureNames = {
  default: 'default',
  question: 'question',
};

export default class Distraction {
  distractionType = DistractionType.DEFAULT;
  sprite: Phaser.GameObjects.Sprite;
  distractionTextureNames: any;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    //Mando did this
    this.sprite = scene.add.sprite(x, y, DistractionTextureNames.default);
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
    this.sprite.play('defaultAnimation');
  }

  setDistraction(distractionType: number) {
    this.distractionType = distractionType;

    switch (this.distractionType) {
      case DistractionType.DEFAULT:
        this.sprite.setTexture(DistractionTextureNames.default);
        break;

      case DistractionType.QUESTION:
        this.sprite.setTexture(DistractionTextureNames.question);
        break;

      case DistractionType.WAKEUP:
        this.sprite.setTexture(DistractionTextureNames.question);
        break;

      case DistractionType.EAT:
        break;
    }
  }

  // preUpdate(t: number, dt: number) {
  //   super.preUpdate(t, dt);

  //   switch (this.distractionType) {
  //     case DistractionType.DEFAULT:
  //       this.sprite.setTexture(DistractionTextureNames.default);
  //       break;

  //     case DistractionType.QUESTION:
  //       this.sprite.setTexture(DistractionTextureNames.question);
  //       break;

  //     case DistractionType.WAKEUP:
  //       this.sprite.setTexture(DistractionTextureNames.question);
  //       break;

  //     case DistractionType.EAT:
  //       break;
  //   }
  // }
}
