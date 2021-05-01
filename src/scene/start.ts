export default class start extends Phaser.Scene {
    title: Phaser.GameObjects.Image;
    startButton: Phaser.GameObjects.Image;
    instructionButton: Phaser.GameObjects.Image;
    bgm: any;
    correctClickSound: Phaser.Sound.BaseSound;
    text: Phaser.GameObjects.Text;
    startText: Phaser.GameObjects.Text;
    instructionText: Phaser.GameObjects.Text;
    subtitile: Phaser.GameObjects.Text;
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

        // Titile
        this.title = this.add
            .image(this.screenCenterX, 80, 'title')
            .setOrigin(0.5, 0)

        // font sizes
        this.startText = this.add
            .text(this.screenCenterX, 295, 'Start Game', {
                fontFamily: 'Roboto',
                color: '#888888',
            })
            .setOrigin(0.5, 0)
            .setFontSize(15);

        this.instructionText = this.add
            .text(this.screenCenterX, 495, 'Instruction', {
                fontFamily: 'Roboto',
                color: '#888888',
            })
            .setOrigin(0.5, 0)
            .setFontSize(15);

        this.subtitile = this.add
            .text(this.screenCenterX, 140, 'A zoom class inspired game', {
                fontFamily: 'Roboto',
                color: '#666666',
            })
            .setOrigin(0.5, 0)
            .setFontSize(22);

        // Start button
        this.startButton = this.add
            .image(this.screenCenterX, 200, 'start')
            .setOrigin(0.5, 0)
            .setScale(0.6);

        // Tutorial button
        this.instructionButton = this.add
            .image(this.screenCenterX, 400, 'instruction')
            .setOrigin(0.5, 0)
            .setScale(0.6);

        //background music
        this.bgm = this.sound.add('bgm');
        this.bgm.loop = true;
        this.bgm.play();

        // Press start to go to level selection
        this.startButton.setInteractive();

        this.startButton.on('pointerdown', () => {
            this.correctClickSound = this.sound.add('correct');
            this.scene.stop('start');
            this.bgm.stop();
            this.scene.start('lvl1');
        });

        this.startText.setInteractive(new Phaser.Geom.Rectangle(0, 0, this.startText.width, this.startText.height), Phaser.Geom.Rectangle.Contains);

        this.startText.on('pointerdown', () => {
            this.correctClickSound = this.sound.add('correct');
            this.scene.stop('start');
            this.bgm.stop();
            this.scene.start('lvl1');
        });

        // Press instruction to go to instruction
        this.instructionButton.setInteractive();

        this.startButton.on('pointerdown', () => {
            this.correctClickSound = this.sound.add('correct');
            this.scene.stop('start');
            this.bgm.stop();
            this.scene.start('instruction');
        });

    }

}
