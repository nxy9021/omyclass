import { DistractionTypes } from './distraction_types';

export interface DistractionClickEvent {
  name: string;
  distractionType: DistractionTypes;
}
