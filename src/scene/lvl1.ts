import { CharacterTextureNames } from '../characters/characters';
import DistractionTile from '../distractions/distractionTile';
import { DistractionDataContainer } from '../distractions/distractionDataContainer';
import { DistractionTypes } from '../distractions/DistractionTypes';
import { DistractionClickEvent } from '../distractions/DistractionClickEvent';

export default class Lvl1 extends Phaser.Scene {
  text: Phaser.GameObjects.Text;
  mainTimer: Phaser.Time.TimerEvent;
  spawnTimer: Phaser.Time.TimerEvent;
  distractionTiles: any = {
    l1c1: DistractionTile,
    l1c2: DistractionTile,
    l1c3: DistractionTile,
    l2c1: DistractionTile,
    l2c2: DistractionTile,
    l2c3: DistractionTile,
  };
  countDownText: Text;
  countDownBar: Phaser.GameObjects.Graphics;
  barTimerEvents = [];
  currentClickedDistraction: DistractionTypes = DistractionTypes.Default;
  comboCount: number = 0;
  gpaText: Phaser.GameObjects.Text;
  gpaPoints: number = 0;
  successCount: number = 0;
  heatLevel: number = 0;
  allowedDistractionTypes: DistractionTypes[] = [];
  maximumActiveDistractions: number;
  countdownInterval: number;
  spawnIntervalRange: { minimum: number, maximum: number };

  constructor() {
    super('lvl1');
    this.allowedDistractionTypes.push(DistractionTypes.Dots);
    this.maximumActiveDistractions = 3;
    this.countdownInterval = 5000;
    this.spawnIntervalRange = { minimum: 500, maximum: 2000 };
  }

  setHeatLevel = () => {
    if (this.comboCount <= 0) {
      this.heatLevel = 0
    } else if (this.comboCount <= 2) {
      this.heatLevel = 1
    } else if (this.comboCount <= 5) {
      this.heatLevel = 2
    } else if (this.comboCount <= 8) {
      this.heatLevel = 3
    } else if (this.comboCount <= 10) {
      this.heatLevel = 4
    } else {
      this.heatLevel = 5
    }
  }

  //clickhandler
  handleDistractionButtonOnClick(event: DistractionClickEvent) {
    if (
      this.currentClickedDistraction !== DistractionTypes.Default &&
      event.distractionType == this.currentClickedDistraction
    ) {
      this.comboCount++;
      this.setHeatLevel();
      this.successCount++;
      this.gpaPoints = this.successCount * 0.5 + this.heatLevel * this.successCount;
      this.distractionTiles[event.name].reset();
    } else {
      this.comboCount = 0;
    }

    this.currentClickedDistraction = DistractionTypes.Default;
    this.input.setDefaultCursor(
      `url(${DistractionDataContainer.default.cursor}), pointer`
    );
  }

  getNonDistractedTileNames = () => {
    const nonDistractedTileNames: string[] = [];

    for (const key of Object.keys(this.distractionTiles)) {
      if (!this.distractionTiles[key].isDistracted()) {
        nonDistractedTileNames.push(key);
      }
    }
    return nonDistractedTileNames;
  }

  getRandomAllowedDistractionType = (): DistractionTypes => {
    //generate a random number according to the length of the array of the distractoin types
    const allowedDistractionTypesIndex: number =
      Phaser.Math.Between(0, this.allowedDistractionTypes.length - 1);

    //get a random distractionTypes that is allowed
    return this.allowedDistractionTypes[allowedDistractionTypesIndex];
  }

  //distraction spawning
  handleDistractionSpawning = () => {
    const nonDistractedTileNames: string[] =
      this.getNonDistractedTileNames();
    const distractedTileCount: number =
      Object.keys(this.distractionTiles).length - nonDistractedTileNames.length;

    if (distractedTileCount < this.maximumActiveDistractions) {
      //generate a random number according to the length of the array of the non distracted tiles
      const nonDistractedTileNameIndex: number =
        Phaser.Math.Between(0, nonDistractedTileNames.length - 1);

      //get the name of one none distracted tile, distract it
      const tileNameToDistract: string =
        nonDistractedTileNames[nonDistractedTileNameIndex];

      this.distractionTiles[tileNameToDistract]
        .setDistraction(this.getRandomAllowedDistractionType(), this.countdownInterval);
    }

    //time inbetween spawns
    const newSpawnInterval = Phaser.Math.Between(this.spawnIntervalRange.minimum, this.spawnIntervalRange.maximum);
    this.setSpawnTimer(newSpawnInterval);
  }

  setSpawnTimer = (interval: number) => {
    this.spawnTimer = this.time.delayedCall(
      interval,
      this.handleDistractionSpawning,
      [],
      this
    );
  }

  // TODO: Calculate points



  setupDistractionButton = (
    distractionType: DistractionTypes,
    x: number,
    y: number
  ): void => {
    let data = DistractionDataContainer[distractionType];
    let button = this.add.sprite(x, y, `${distractionType}Button`);

    button.setInteractive({ cursor: `url(${data.cursor}), pointer` });

    button.on('pointerdown', () => {
      button.setTint(data.color);
      this.input.setDefaultCursor(`url(${data.cursor}), pointer`);
      this.currentClickedDistraction = distractionType;
    });
  };

  onGameTimeOver() {
    // TODO: load try again screen
  }

  create() {
    // background reference
    // this.add.image(460, 320, 'ref').setScale(0.6, 0.6);
    this.add.image(460, 320, 'heatBg');

    // distraction animation
    this.distractionTiles.l1c1 = new DistractionTile(
      this,
      150,
      196,
      'l1c1',
      CharacterTextureNames.boy1
    );
    this.distractionTiles.l1c2 = new DistractionTile(
      this,
      400,
      196,
      'l1c2',
      CharacterTextureNames.boy2
    );
    this.distractionTiles.l1c3 = new DistractionTile(
      this,
      650,
      196,
      'l1c3',
      CharacterTextureNames.girl1
    );
    this.distractionTiles.l2c1 = new DistractionTile(
      this,
      150,
      410,
      'l2c1',
      CharacterTextureNames.girl2
    );
    this.distractionTiles.l2c2 = new DistractionTile(
      this,
      400,
      410,
      'l2c2',
      CharacterTextureNames.girl3
    );
    this.distractionTiles.l2c3 = new DistractionTile(
      this,
      650,
      410,
      'l2c3',
      CharacterTextureNames.girl4
    );

    this.setupDistractionButton(DistractionTypes.Dots, 150, 570);
    this.setSpawnTimer(3000);

    //Event listener
    this.events.on('distractionClick', (event: DistractionClickEvent) =>
      this.handleDistractionButtonOnClick(event)
    );

    //cursor
    this.input.setDefaultCursor(
      'url(assets/img/cursors/cdefault.png), pointer'
    );

    //timer
    this.text = this.add
      .text(40, 40, '', {
        fontFamily: 'Roboto',
      })
      .setFontSize(20);

    this.mainTimer = this.time.delayedCall(
      60000,
      this.onGameTimeOver,
      [],
      this
    );

    //gpa
    this.gpaText = this.add
      .text(640, 40, '', {
        fontFamily: 'Roboto',
      })
      .setFontSize(20);

    //heatlevel
    this.heatLevel;

  }

  update() {
    //timer
    const time = this.mainTimer.getProgress().toString().substr(0, 4);
    this.text.setText(`Time: ${time}`);

    //gpa
    const gpaPoints = this.gpaPoints;
    this.gpaText.setText(`GPA: ${gpaPoints}`);

    //Updates the state of all distraction tiles every tick/frame
    Object.keys(this.distractionTiles).forEach((key) =>
      this.distractionTiles[key].update()
    );
  }
}
