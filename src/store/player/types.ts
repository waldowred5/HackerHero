export enum PLAYER {
  NEUTRAL = 'NEUTRAL',
  PLAYER_1 = 'PLAYER_1',
  PLAYER_2 = 'PLAYER_2',
}

export type PLAYER_COLOR = {
  [key: string]: {
    edge: string,
    hackBot: string,
    vertex: string,
  },
}

export interface PlayerState {
  playerColors: PLAYER_COLOR,
  selectedPlayer: keyof typeof PLAYER,

  // Actions
  updateSelectedPlayer: (player: keyof typeof PLAYER) => void,
}
