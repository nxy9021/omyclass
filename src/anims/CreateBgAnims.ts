export default function CreateDistractionAnimation(
  anims: Phaser.Animations.AnimationManager,
  animationName: string,
  animationFrames: any[]
) {
  anims.create({
    key: animationName,
    frames: animationFrames,
    frameRate: 24,
    repeat: -1,
  });
}
