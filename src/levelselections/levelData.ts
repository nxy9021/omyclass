import { DistractionTypes } from "../distractions/distraction_types";

export default interface LevelData {
    name: string,
    allowedDistractionTypes: DistractionTypes[],
    maximumActiveDistractions: number,
    countdownInterval: number;
    spawnIntervalRange: { minimum: number, maximum: number },
    levelDuration: number
}
