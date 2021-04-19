import { DistractionTypes } from './DistractionType';


export default interface DistractionClickEvent {
  name: string;
  distractionType: DistractionTypes;
}
