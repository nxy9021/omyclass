export default class start extends Phaser.Scene {
    title: Phaser.GameObjects.Image;
    startButton: Phaser.GameObjects.Image;
    instructionButton: Phaser.GameObjects.Image;
    bgm: any;
    correctClickSound: Phaser.Sound.BaseSound;
    text: Phaser.GameObjects.Text;
    startText: Phaser.GameObjects.Text;
    instructionText: Phaser.GameObjects.Text;
    subtitle: Phaser.GameObjects.Text;
    screenCenterX: number;

    constructor() {
        super('start');
    }

    create() {
        this.cameras.main.backgroundColor.setTo(244, 244, 244);
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;

        //cursor
        this.input.setDefaultCursor(
            'url(assets/img/cursors/cdefault.png), pointer'
        );

        // Title
        this.title = this.add
            .image(this.screenCenterX, 80, 'title')
            .setOrigin(0.5, 0)

        // font sizes
        this.startText = this.add
            .text(this.screenCenterX, 335, 'Start Game', {
                fontFamily: 'Roboto',
                color: '#888888',
                resolution: 2.5
            })
            .setOrigin(0.5, 0)
            .setFontSize(15);

        this.instructionText = this.add
            .text(this.screenCenterX, 495, 'Instructions', {
                fontFamily: 'Roboto',
                color: '#888888',
                resolution: 2.5
            })
            .setOrigin(0.5, 0)
            .setFontSize(15);

        this.subtitle = this.add
            .text(this.screenCenterX, 140, 'A zoom class inspired game', {
                fontFamily: 'Roboto',
                color: '#666666',
                resolution: 2.5
            })
            .setOrigin(0.5, 0)
            .setFontSize(22);

        // Start button
        this.startButton = this.add
            .image(this.screenCenterX, 240, 'start')
            .setOrigin(0.5, 0)
            .setScale(0.6);

        // Tutorial button
        this.instructionButton = this.add
            .image(this.screenCenterX, 400, 'instruction')
            .setOrigin(0.5, 0)
            .setScale(0.6);

        //background music
        this.bgm = this.sound.add('bgm', { volume: 0.5 });
        this.bgm.loop = true;
        this.bgm.play();

        // Press start to go to level selection
        this.startButton.setInteractive();

        this.startButton.on('pointerdown', () => {
            this.correctClickSound = this.sound.add('correct');
            this.scene.stop('start');
            this.bgm.stop();
            this.scene.start('selectlvl');
        });

        this.startText.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.startText.width, this.startText.height), Phaser.Geom.Rectangle.Contains);

        this.startText.on('pointerdown', () => {
            this.correctClickSound = this.sound.add('correct');
            this.scene.stop('start');
            this.bgm.stop();
            this.scene.start('selectlvl');
        });

        // Press startnow to go to instruction
        this.instructionButton.setInteractive();

        this.instructionButton.on('pointerdown', () => {
            this.correctClickSound = this.sound.add('correct');
            this.scene.stop('start');
            this.bgm.stop();
            this.scene.start('instructions');
        });
    }

}
