import { Levels } from "../levelselections/levels";

export default class selectlvl extends Phaser.Scene {
    bgm: any;
    screenCenterX: number;
    screenCenterY: number;
    startNowButton: Phaser.GameObjects.Image;
    selectlvlbg: Phaser.GameObjects.Image;
    close: Phaser.GameObjects.Image;
    selectedLevel: string;
    levelCompletionData:
        { [key: string]: { stars: number, isUnlocked: boolean, selector: Phaser.GameObjects.Image } }
        = {
            lvl1: { stars: 0, isUnlocked: true, selector: {} as Phaser.GameObjects.Image },
            lvl2: { stars: 1, isUnlocked: true, selector: {} as Phaser.GameObjects.Image },
            lvl3: { stars: 3, isUnlocked: true, selector: {} as Phaser.GameObjects.Image },
            lvl4: { stars: 0, isUnlocked: false, selector: {} as Phaser.GameObjects.Image },
            lvl5: { stars: 0, isUnlocked: false, selector: {} as Phaser.GameObjects.Image },
            lvl6: { stars: 0, isUnlocked: false, selector: {} as Phaser.GameObjects.Image },
            lvl7: { stars: 0, isUnlocked: false, selector: {} as Phaser.GameObjects.Image },
            lvl8: { stars: 0, isUnlocked: false, selector: {} as Phaser.GameObjects.Image },
            lvl9: { stars: 0, isUnlocked: false, selector: {} as Phaser.GameObjects.Image },
            lvl10: { stars: 0, isUnlocked: false, selector: {} as Phaser.GameObjects.Image },
            lvl11: { stars: 0, isUnlocked: false, selector: {} as Phaser.GameObjects.Image },
            lvl12: { stars: 0, isUnlocked: false, selector: {} as Phaser.GameObjects.Image },
            lvl13: { stars: 0, isUnlocked: false, selector: {} as Phaser.GameObjects.Image },
            lvl14: { stars: 0, isUnlocked: false, selector: {} as Phaser.GameObjects.Image },
            lvl15: { stars: 0, isUnlocked: false, selector: {} as Phaser.GameObjects.Image },
        };

    renderLevelTiles() {
        let xPosition = 200;
        let yPosition = 200;
        for (const [levelName, data] of Object.entries(this.levelCompletionData)) {
            let levelNumber: number = parseInt(levelName[levelName.length - 1]);

            data.selector = this.add
                .image(xPosition, yPosition, '')
                .setScale(0.6);
            let selectorBounds = data.selector.getBounds();

            if (data.isUnlocked) {
                data.selector
                    .setTexture('nonselectedlvl')
                    .setInteractive()
                    .on('pointerdown', () => {
                        if (!!this.selectedLevel) {
                            this.levelCompletionData[this.selectedLevel]
                                .selector
                                .setTexture('nonselectedlvl');
                        }
                        data.selector.setTexture('selectedlvl');
                        this.selectedLevel = levelName;
                    });
                this.add.text(selectorBounds.centerX, selectorBounds.y - 5, levelNumber.toString(), {
                    fontFamily: 'Roboto',
                    fontStyle: 'bold',
                    resolution: 3
                })
                    .setFontSize(50)
                    .setOrigin(0.5, 0.5);
                this.add
                    .image(selectorBounds.centerX, selectorBounds.centerY + 10, `${data.stars}starlvl`)
                    .setScale(0.6)
                    .setOrigin(0.5, 0);
            } else {
                data.selector.setTexture('lockedlvl');
            }

            if (levelNumber % 5 === 0 && levelNumber <= 15) {
                yPosition += 115;
                xPosition = 200
            } else {
                xPosition += 125;
            }
        }
    }

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
                const levelData = Levels[this.selectedLevel];
                // .find(data => data.name == this.selectedLevel)
                this.scene.start('lvl', levelData);
            });

        this.renderLevelTiles();
    }
}
