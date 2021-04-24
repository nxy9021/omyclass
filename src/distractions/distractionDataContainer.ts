export const DistractionDataContainer: DistractionDataContainer = {
  default: {
    name: 'default',
    cursor: 'assets/img/cursors/cdefault.png',
    button: '',
    color: 0,
  } as DistractionData,
  question: {
    name: 'question',
    cursor: 'assets/img/cursors/cyellow.png',
    button: 'assets/img/bubbles/byellow.png',
    color: 0xf7fc00,
  } as DistractionData,
  food: {
    name: 'food',
    cursor: 'assets/img/cursors/cred.png',
    button: 'assets/img/bubbles/bred.png',
    color: 0xff5a5a,
  } as DistractionData,
  dots: {
    name: 'dots',
    cursor: 'assets/img/cursors/cblue.png',
    button: 'assets/img/bubbles/bblue.png',
    color: 0x00c2ff,
  } as DistractionData,
  wakeup: {
    name: 'wakeup',
    cursor: 'assets/img/cursors/cgreen.png',
    button: 'assets/img/bubbles/bgreen.png',
    color: 0x00ea88,
  } as DistractionData,
};

export interface DistractionDataContainer {
  default: DistractionData,
  question: DistractionData,
  food: DistractionData,
  dots: DistractionData,
  wakeup: DistractionData,
}

export interface DistractionData {
  name: string,
  cursor: string,
  button: string,
  color: number,
}
