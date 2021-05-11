import { Levels } from "../levelselections/levels";

export default class selectlvl extends Phaser.Scene {
    bgm: any;
    screenCenterX: number;
    screenCenterY: number;
    startNowButton: Phaser.GameObjects.Image;
    selectLvlBg: Phaser.GameObjects.Image;
    close: Phaser.GameObjects.Image;
    selectedLevel: string;
    levelCompletionData:
        { [key: string]: { stars: number, isUnlocked: boolean, selector: Phaser.GameObjects.Image } }
        = {
            lvl1: { stars: 0, isUnlocked: true, selector: {} as Phaser.GameObjects.Image },
            lvl2: { stars: 0, isUnlocked: false, selector: {} as Phaser.GameObjects.Image },
            lvl3: { stars: 0, isUnlocked: false, selector: {} as Phaser.GameObjects.Image },
            lvl4: { stars: 0, isUnlocked: false, selector: {} as Phaser.GameObjects.Image },
            lvl5: { stars: 0, isUnlocked: false, selector: {} as Phaser.GameObjects.Image },
            lvl6: { stars: 0, isUnlocked: false, selector: {} as Phaser.GameObjects.Image },
            lvl7: { stars: 0, isUnlocked: false, selector: {} as Phaser.GameObjects.Image },
            lvl8: { stars: 0, isUnlocked: false, selector: {} as Phaser.GameObjects.Image },
            lvl9: { stars: 0, isUnlocked: false, selector: {} as Phaser.GameObjects.Image },
        };

    constructor() {
        super('selectlvl');
    }

    getLocalStorageData() {
        // Get star counts from local storage
        for (const [levelName, data] of Object.entries(this.levelCompletionData)) {
            let starCountString = localStorage.getItem(levelName);
            if (starCountString) {
                data.stars = parseInt(starCountString);
            } else {
                data.stars = 0;
            }
        }

        //Figure out level unlocks
        for (let i = 9; i >= 1; i--) {
            let currentLevelData = this.levelCompletionData[`lvl${i}`];

            if (i == 1) {
                currentLevelData.isUnlocked = true;
            } else {
                let previousLevelData = this.levelCompletionData[`lvl${i - 1}`];
                currentLevelData.isUnlocked = previousLevelData.stars >= 1;
            }
        }
    }

    renderLevelTiles() {
        let xPosition = 325;
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

                        // startnow button
                        this.startNowButton = this.add
                            .image(this.screenCenterX, 520, 'startnow')
                            .setInteractive()
                            .setOrigin(0.5, 0)
                            .on('pointerdown', () => {
                                this.scene.stop('instruction');
                                this.bgm.stop();
                                const levelData = Levels[this.selectedLevel];
                                // .find(data => data.name == this.selectedLevel)
                                this.scene.start('lvl', levelData);
                            });
                    });
                this.add.text(selectorBounds.centerX, selectorBounds.y, levelNumber.toString(), {
                    fontFamily: 'Roboto',
                    fontStyle: 'bold',
                    resolution: 3
                })
                    .setFontSize(45)
                    .setOrigin(0.5, 0.5);
                this.add
                    .image(selectorBounds.centerX, selectorBounds.centerY + 10, `${data.stars}starlvl`)
                    .setScale(0.6)
                    .setOrigin(0.5, 0);
            } else {
                data.selector.setTexture('lockedlvl');
            }

            //repeat level tiles
            if (levelNumber % 3 === 0 && levelNumber <= 9) {
                yPosition += 115;
                xPosition = 325;
            } else {
                xPosition += 125;
            }
        }
    }

    create() {
        this.getLocalStorageData();
        this.cameras.main.backgroundColor.setTo(188, 188, 188);
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        // add background image
        this.selectLvlBg = this.add
            .image(this.screenCenterX, this.screenCenterY, 'selectlvlbg')
            .setOrigin(0.5, 0.5)
            .setScale(0.6);

        //background music
        this.bgm = this.sound.add('bgm')
        this.bgm.setVolume(.7);;
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
        this.renderLevelTiles();
    }
}
