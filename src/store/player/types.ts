export enum PLAYER {
  NEUTRAL = 'NEUTRAL',
  PLAYER_1 = 'PLAYER_1',
  PLAYER_2 = 'PLAYER_2',
}

export type PLAYER_COLOR = {
  [key: string]: string,
}

export interface PlayerState {
  playerColors: PLAYER_COLOR,
}
