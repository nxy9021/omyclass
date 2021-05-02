export default class Instructions extends Phaser.Scene {

    bgm: any;
    screenCenterX: number;
    close: Phaser.GameObjects.Image;
    instructionScreen: Phaser.GameObjects.Image;
    startNowButton: Phaser.GameObjects.Image;

    constructor() {
        super('instructions');
    }

    create() {
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;

        this.add
            .image(0, 0, 'tutorial')
            .setOrigin(0, 0)

        //cursor
        this.input.setDefaultCursor(
            'url(assets/img/cursors/cdefault.png), pointer'
        );

        // close button, back to main screen
        this.close = this.add
            .image(70, 80, 'close')
            .setInteractive()
            .setScale(0.6)
            .on('pointerdown', () => {
                this.scene.stop('instruction');
                this.bgm.stop();
                this.scene.start('start');
            });

        const closeButtonBounds = this.close.getBounds();

        this.add
            .text(closeButtonBounds.left - 3, closeButtonBounds.bottom + 10, 'Go Back', {
                fontFamily: 'Roboto',
                resolution: 2.5
            })
            .setFontSize(15);

        // startnow button
        this.startNowButton = this.add
            .image(this.screenCenterX, 550, 'startnow')
            .setOrigin(0.5, 0);

        //background music
        this.bgm = this.sound.add('bgm');
        this.bgm.loop = true;
        this.bgm.play();

        //Press start to start the game now
        this.startNowButton
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.stop('start');
                this.bgm.stop();
                //TODO: Load level selector
                this.scene.start('lvl1');
            });
    }
}

