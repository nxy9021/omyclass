import { DistractionTypes } from "../distractions/distraction_types";
import LevelData from "./levelData";

// Fixes string key acces from this SO post
// https://stackoverflow.com/questions/57438198/typescript-element-implicitly-has-an-any-type-because-expression-of-type-st
export const Levels: { [key: string]: LevelData } = {
    lvl1: {
        name: 'lvl1',
        allowedDistractionTypes: [DistractionTypes.Dots],
        maximumActiveDistractions: 3,
        countdownInterval: 5000,
        spawnIntervalRange: { minimum: 500, maximum: 2000 },
        levelDuration: 42000
    },
    lvl2: {
        name: 'lvl2',
        allowedDistractionTypes: [
            DistractionTypes.Dots,
            DistractionTypes.Food
        ],
        maximumActiveDistractions: 3,
        countdownInterval: 5000,
        spawnIntervalRange: { minimum: 500, maximum: 2000 },
        levelDuration: 42000
    },
    lvl3: {
        name: 'lvl3',
        allowedDistractionTypes: [DistractionTypes.Dots],
        maximumActiveDistractions: 3,
        countdownInterval: 5000,
        spawnIntervalRange: { minimum: 500, maximum: 2000 },
        levelDuration: 42000
    },
    lvl4: {
        name: 'lvl4',
        allowedDistractionTypes: [DistractionTypes.Dots],
        maximumActiveDistractions: 3,
        countdownInterval: 5000,
        spawnIntervalRange: { minimum: 500, maximum: 2000 },
        levelDuration: 42000
    },
    lvl5: {
        name: 'lvl5',
        allowedDistractionTypes: [DistractionTypes.Dots],
        maximumActiveDistractions: 3,
        countdownInterval: 5000,
        spawnIntervalRange: { minimum: 500, maximum: 2000 },
        levelDuration: 42000
    },
    lvl6: {
        name: 'lvl6',
        allowedDistractionTypes: [DistractionTypes.Dots],
        maximumActiveDistractions: 3,
        countdownInterval: 5000,
        spawnIntervalRange: { minimum: 500, maximum: 2000 },
        levelDuration: 42000
    },
    lvl7: {
        name: 'lvl7',
        allowedDistractionTypes: [DistractionTypes.Dots],
        maximumActiveDistractions: 3,
        countdownInterval: 5000,
        spawnIntervalRange: { minimum: 500, maximum: 2000 },
        levelDuration: 42000
    },
    lvl8: {
        name: 'lvl8',
        allowedDistractionTypes: [DistractionTypes.Dots],
        maximumActiveDistractions: 3,
        countdownInterval: 5000,
        spawnIntervalRange: { minimum: 500, maximum: 2000 },
        levelDuration: 42000
    },
    lvl9: {
        name: 'lvl9',
        allowedDistractionTypes: [DistractionTypes.Dots],
        maximumActiveDistractions: 3,
        countdownInterval: 5000,
        spawnIntervalRange: { minimum: 500, maximum: 2000 },
        levelDuration: 42000
    },
    lvl10: {
        name: 'lvl10',
        allowedDistractionTypes: [DistractionTypes.Dots],
        maximumActiveDistractions: 3,
        countdownInterval: 5000,
        spawnIntervalRange: { minimum: 500, maximum: 2000 },
        levelDuration: 42000
    },
    lvl11: {
        name: 'lvl11',
        allowedDistractionTypes: [DistractionTypes.Dots],
        maximumActiveDistractions: 3,
        countdownInterval: 5000,
        spawnIntervalRange: { minimum: 500, maximum: 2000 },
        levelDuration: 42000
    },
    lvl12: {
        name: 'lvl12',
        allowedDistractionTypes: [DistractionTypes.Dots],
        maximumActiveDistractions: 3,
        countdownInterval: 5000,
        spawnIntervalRange: { minimum: 500, maximum: 2000 },
        levelDuration: 42000
    },
    lvl13: {
        name: 'lvl13',
        allowedDistractionTypes: [DistractionTypes.Dots],
        maximumActiveDistractions: 3,
        countdownInterval: 5000,
        spawnIntervalRange: { minimum: 500, maximum: 2000 },
        levelDuration: 42000
    },
    lvl14: {
        name: 'lvl14',
        allowedDistractionTypes: [DistractionTypes.Dots],
        maximumActiveDistractions: 3,
        countdownInterval: 5000,
        spawnIntervalRange: { minimum: 500, maximum: 2000 },
        levelDuration: 42000
    },
    lvl15: {
        name: 'lvl15',
        allowedDistractionTypes: [DistractionTypes.Dots],
        maximumActiveDistractions: 3,
        countdownInterval: 5000,
        spawnIntervalRange: { minimum: 500, maximum: 2000 },
        levelDuration: 42000
    },
}
