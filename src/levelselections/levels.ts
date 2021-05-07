import { DistractionTypes } from "../distractions/distraction_types";
import LevelData from "./levelData";

// Fixes string key acces from this SO post
// https://stackoverflow.com/questions/57438198/typescript-element-implicitly-has-an-any-type-because-expression-of-type-st
export const Levels: { [key: string]: LevelData } = {
    lvl1: {
        name: 'lvl1',
        allowedDistractionTypes: [DistractionTypes.Dots],
        maximumActiveDistractions: 2,
        countdownInterval: 5000,
        spawnIntervalRange: { minimum: 500, maximum: 2000 },
        levelDuration: 45000
    },
    lvl2: {
        name: 'lvl2',
        allowedDistractionTypes: [
            DistractionTypes.Dots,
            DistractionTypes.Question
        ],
        maximumActiveDistractions: 3,
        countdownInterval: 5000,
        spawnIntervalRange: { minimum: 800, maximum: 2000 },
        levelDuration: 45000
    },
    lvl3: {
        name: 'lvl3',
        allowedDistractionTypes: [
            DistractionTypes.Dots,
            DistractionTypes.Question,
            DistractionTypes.Food
        ],
        maximumActiveDistractions: 3,
        countdownInterval: 5000,
        spawnIntervalRange: { minimum: 800, maximum: 2000 },
        levelDuration: 45000
    },
    lvl4: {
        name: 'lvl4',
        allowedDistractionTypes: [
            DistractionTypes.Dots,
            DistractionTypes.Question,
            DistractionTypes.Food,
            DistractionTypes.Wakeup
        ],
        maximumActiveDistractions: 3,
        countdownInterval: 5000,
        spawnIntervalRange: { minimum: 800, maximum: 2000 },
        levelDuration: 45000
    },
    lvl5: {
        name: 'lvl5',
        allowedDistractionTypes: [
            DistractionTypes.Dots,
            DistractionTypes.Question,
            DistractionTypes.Food,
            DistractionTypes.Wakeup
        ],
        maximumActiveDistractions: 3,
        countdownInterval: 5000,
        spawnIntervalRange: { minimum: 500, maximum: 1500 },
        levelDuration: 45000
    },
    lvl6: {
        name: 'lvl6',
        allowedDistractionTypes: [
            DistractionTypes.Dots,
            DistractionTypes.Question,
            DistractionTypes.Food,
            DistractionTypes.Wakeup
        ],
        maximumActiveDistractions: 4,
        countdownInterval: 5000,
        spawnIntervalRange: { minimum: 1000, maximum: 2000 },
        levelDuration: 45000
    },
    lvl7: {
        name: 'lvl7',
        allowedDistractionTypes: [
            DistractionTypes.Dots,
            DistractionTypes.Question,
            DistractionTypes.Food,
            DistractionTypes.Wakeup
        ],
        maximumActiveDistractions: 5,
        countdownInterval: 5000,
        spawnIntervalRange: { minimum: 1000, maximum: 2000 },
        levelDuration: 45000
    },
    lvl8: {
        name: 'lvl8',
        allowedDistractionTypes: [
            DistractionTypes.Dots,
            DistractionTypes.Question,
            DistractionTypes.Food,
            DistractionTypes.Wakeup
        ],
        maximumActiveDistractions: 6,
        countdownInterval: 5000,
        spawnIntervalRange: { minimum: 1200, maximum: 2200 },
        levelDuration: 45000
    },
    lvl9: {
        name: 'lvl9',
        allowedDistractionTypes: [
            DistractionTypes.Dots,
            DistractionTypes.Question,
            DistractionTypes.Food,
            DistractionTypes.Wakeup
        ],
        maximumActiveDistractions: 6,
        countdownInterval: 5000,
        spawnIntervalRange: { minimum: 1000, maximum: 2000 },
        levelDuration: 45000
    },
}
