export default class selectlvl extends Phaser.Scene {

    bgm: any;
    screenCenterX: number;
    screenCenterY: number;
    startNowButton: Phaser.GameObjects.Image;
    selectlvlbg: Phaser.GameObjects.Image;
    close: Phaser.GameObjects.Image;

    constructor() {
        super('selectlvl');
    }

    create() {
        this.cameras.main.backgroundColor.setTo(188, 188, 188);
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        // add background image
        this.selectlvlbg = this.add
            .image(this.screenCenterX, this.screenCenterY, 'selectlvlbg')
            .setOrigin(0.5, 0.5)
            .setScale(0.6);

        // add level backgrounds


        //background music
        this.bgm = this.sound.add('bgm');
        this.bgm.loop = true;
        this.bgm.play();

        // close button, back to main screen
        this.close = this.add
            .image(175, 120, 'close')
            .setInteractive()
            .setScale(0.6)
            .setTint(0x000000)
            .on('pointerdown', () => {
                this.scene.stop('selectlvl');
                this.bgm.stop();
                this.scene.start('start');
            });

        // startnow button
        this.startNowButton = this.add
            .image(this.screenCenterX, 500, 'startnow')
            .setOrigin(0.5, 0);

        //Press start to start the game now
        this.startNowButton
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.stop('instruction');
                this.bgm.stop();
                this.scene.start('lvl1');
            });

    }
}
