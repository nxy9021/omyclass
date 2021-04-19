export const CharacterTextureNames = {
  boy1: 'boy1',
  boy2: 'boy2',
  girl1: 'girl1',
  girl2: 'girl2',
  girl3: 'girl3',
  girl4: 'girl4',
};

export const CharacterType = {
  BOY1: 0,
  BOY2: 1,
  BOY3: 2,
  GIRL1: 3,
  GIRL2: 4,
  GIRL3: 5,
  GIRL4: 6,
};

export default class Characters {
  _sprite: Phaser.GameObjects.Sprite;
  _charactorTextureNames: any;
}
