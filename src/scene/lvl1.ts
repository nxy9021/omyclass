import { CharacterTextureNames } from '../characters/characters';
import DistractionTile from '../distractions/distraction_tile';
import { DistractionDataContainer } from '../distractions/distraction_data_container';
import { DistractionTypes } from '../distractions/distraction_types';
import { DistractionClickEvent } from '../distractions/distraction_click_event';

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
  gpa: string = '0.00';
  earnedPoints: number = 0;
  successCount: number = 0;
  heatLevel: number = 0;
  totalSpawnedDistractions: number = 0;
  totalPossibleScore: number = 0;
  allowedDistractionTypes: DistractionTypes[] = [];
  maximumActiveDistractions: number;
  countdownInterval: number;
  spawnIntervalRange: { minimum: number, maximum: number };
  heatGauge: Phaser.GameObjects.Sprite;
  gameSound: any;
  correctClickSound: Phaser.Sound.BaseSound;
  incorrectClickSound: Phaser.Sound.BaseSound;

  constructor() {
    super('lvl1');
    this.allowedDistractionTypes.push(DistractionTypes.Dots);
    this.maximumActiveDistractions = 3;
    this.countdownInterval = 5000;
    this.spawnIntervalRange = { minimum: 500, maximum: 2000 };
  }

  updateGpa = () => {
    if (this.earnedPoints === 0) {
      this.gpa = '0.00';
    } else {
      this.gpa = (this.earnedPoints / this.totalPossibleScore * 4.0).toFixed(2);
    }
    this.gpaText.setText(`GPA: ${this.gpa}`);
  }

  //set heat level for points calculation
  setHeatLevel = () => {
    if (this.comboCount <= 2) {
      this.heatLevel = 1.5
    } else if (this.comboCount <= 5) {
      this.heatLevel = 2.25
    } else if (this.comboCount <= 8) {
      this.heatLevel = 3.25
    } else if (this.comboCount <= 10) {
      this.heatLevel = 3.5
    } else {
      this.heatLevel = 3.75
    }
  }

  incrementTotalPossibleScore = () => {
    if (this.totalSpawnedDistractions <= 2) {
      this.totalPossibleScore += 1.5
    } else if (this.totalSpawnedDistractions <= 5) {
      this.totalPossibleScore += 2.25
    } else if (this.totalSpawnedDistractions <= 8) {
      this.totalPossibleScore += 3.25
    } else if (this.totalSpawnedDistractions <= 10) {
      this.totalPossibleScore += 3.5
    } else {
      this.totalPossibleScore += 3.75
    }
  }

  //interaction logic is conducted by this function
  handleDistractionButtonOnClick(event: DistractionClickEvent) {
    //check if the click distraction matches the cursor's distraction
    if (
      this.currentClickedDistraction !== DistractionTypes.Default &&
      event.distractionType == this.currentClickedDistraction
    ) {
      //calculate points
      this.comboCount++;
      this.setHeatLevel();
      this.successCount++;
      this.earnedPoints += this.heatLevel;

      //clear out the distraction tile once clicked
      this.distractionTiles[event.name].reset();

      this.correctClickSound.play();
    } else {
      //reset combo if done wrong
      this.comboCount = 0;
      this.incorrectClickSound.play();
    }

    //reset cursor from current distraction to default
    this.currentClickedDistraction = DistractionTypes.Default;
    this.input.setDefaultCursor(
      `url(${DistractionDataContainer.default.cursor}), pointer`
    );
  }

  getNonDistractedTileNames = () => {
    const nonDistractedTileNames: string[] = [];

    //push all none-distracted tile names into the array and return it
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

  handleDistractionSpawning = () => {
    const nonDistractedTileNames: string[] =
      this.getNonDistractedTileNames();
    const distractedTileCount: number =
      Object.keys(this.distractionTiles).length - nonDistractedTileNames.length;
    const totalTimeRemaining: number = this.mainTimer.getRemaining();
    const shouldDistractionsRender: boolean = totalTimeRemaining > this.countdownInterval;

    //things will not spawn on the last couple of seconds
    if (distractedTileCount < this.maximumActiveDistractions && shouldDistractionsRender) {
      //generate a random number according to the length of the array of the non distracted tiles
      const nonDistractedTileNameIndex: number =
        Phaser.Math.Between(0, nonDistractedTileNames.length - 1);

      //get the name of one none distracted tile, distract it
      const tileNameToDistract: string =
        nonDistractedTileNames[nonDistractedTileNameIndex];

      this.distractionTiles[tileNameToDistract]
        .setDistraction(this.getRandomAllowedDistractionType(), this.countdownInterval);
      this.totalSpawnedDistractions++;
      this.incrementTotalPossibleScore();
    }

    //every time spawning a distraction, this count goes up to keep up with the total distraction spawned

    //time inbetween spawns
    if (shouldDistractionsRender) {
      const newSpawnInterval = Phaser.Math.Between(this.spawnIntervalRange.minimum, this.spawnIntervalRange.maximum);
      this.setSpawnTimer(newSpawnInterval);
    }
  }

  // sets a timer that calls the distraction spawning handler function when the timer's up
  setSpawnTimer = (interval: number) => {
    this.spawnTimer = this.time.delayedCall(
      interval,
      this.handleDistractionSpawning,
      [],
      this
    );
  }

  // create distration button and cursor that could be used to clear distractions
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

  generateDistractionButtons = () => {
    //iterate through distraction data container, if the distraction name is in the allowed distraction types in this level, grab the button's data and generate the button
    for (const [, distractionData] of Object.entries(DistractionDataContainer)) {
      if (this.allowedDistractionTypes.includes(distractionData.name)) {
        this.setupDistractionButton(distractionData.name, distractionData.x, distractionData.y);
      }
    }
  }

  updateRemainingTime = () => {
    //timer
    const remainingTime = this.mainTimer.getRemainingSeconds().toFixed(2);
    const indexOfDecimalPlace = remainingTime.indexOf('.');

    const remainingHundredths = remainingTime.substring(indexOfDecimalPlace + 1);
    let remainingSeconds = remainingTime.substring(0, indexOfDecimalPlace);
    if (remainingSeconds.length < 2) {
      remainingSeconds = `0${remainingSeconds}`;
    }
    this.text.setText(`Time: ${remainingSeconds}:${remainingHundredths}`);
  }

  updateTiles = () => {
    Object.keys(this.distractionTiles).forEach((key) =>
      this.distractionTiles[key].update()
    );
  }

  updateHeatGauge(value: number) {
    const h = Math.floor(this.heatGauge.height * value);

    // set heights of sprite
    this.heatGauge.frame.height = (h <= 0 ? 1 : h);
    this.heatGauge.frame.cutHeight = h;

    // It goes the wrong way if I don't do this
    this.heatGauge.flipY = true;

    // update screen
    this.heatGauge.frame.updateUVs();
  }

  handleGameSound() {
    let soundRate = this.gameSound.rate;

    if (!this.gameSound.loop && soundRate < 1.5) {
      soundRate += .051;
      this.gameSound.setRate(soundRate);
      this.gameSound.play();
      this.gameSound.once('complete', () => this.handleGameSound());
    } else {
      this.gameSound.setLoop(true);
      this.gameSound.play();
    }
  }

  onGameTimeOver() {
    this.gameSound.stop();
    // TODO: load try again screen
  }

  create() {
    this.heatGauge = this.add.sprite(826, 294, 'heat_gauge');
    // heatguage background
    this.add.image(460, 322, 'heatBg');

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

    this.generateDistractionButtons();
    this.setSpawnTimer(3000);

    //Event listener for click
    this.events.on('distractionClick', (event: DistractionClickEvent) =>
      this.handleDistractionButtonOnClick(event)
    );

    //Event listener for expired distraction
    this.events.on('expiredDistraction', () => {
      this.comboCount = 0;
      this.incorrectClickSound.play();
    });

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
      45000,
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

    //click sound
    this.correctClickSound = this.sound.add('correct');
    this.incorrectClickSound = this.sound.add('incorrect');
    //music
    this.gameSound = this.sound.add('tadara');
    this.handleGameSound();
  }

  update() {
    //timer
    this.updateRemainingTime();

    //gpa
    this.updateGpa();

    //Updates the state of all distraction tiles every tick/frame
    this.updateTiles()

    this.updateHeatGauge(this.comboCount / 11);
  }
}
