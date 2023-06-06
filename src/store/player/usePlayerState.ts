import { create } from 'zustand';
import { PLAYER, PlayerState } from '@/store/player/types';

export default create<PlayerState>((set) => {
  return {
    playerColors: {
      [PLAYER.NEUTRAL]: {
        edge: [0.5, 0.5, 0.5],
        hackBot: 'lightgrey', // TODO: Set array based values
        vertex: [0.2, 0.2, 0.2],
      },
      [PLAYER.PLAYER_1]: {
        edge: [0.0, 0.3, 10.0],
        hackBot: 'cyan', // TODO: Set array based values
        vertex: [0.0, 0.6, 10.0],
      },
      [PLAYER.PLAYER_2]: {
        edge: [8.0, 0.2, 0.0],
        hackBot: 'orange', // TODO: Set array based values
        vertex: [8.0, 0.4, 0.0],
      },
    },
    selectedPlayer: PLAYER.PLAYER_1,

    // Actions
    updateSelectedPlayer: (player: keyof typeof PLAYER) => {
      set({
        selectedPlayer: player,
      });
    }
  };
});
