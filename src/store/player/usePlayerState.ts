import { create } from 'zustand';
import { PLAYER, PlayerState } from '@/store/player/types';

export default create<PlayerState>((set) => {
  return {
    playerColors: {
      [PLAYER.NEUTRAL]: {
        edge: 'lightgrey',
        hackBot: 'lightgrey',
        vertex: 'grey',
      },
      [PLAYER.PLAYER_1]: {
        edge: 'blue',
        hackBot: 'cyan',
        vertex: 'blue',
      },
      [PLAYER.PLAYER_2]: {
        edge: 'red',
        hackBot: 'orange',
        vertex: 'red',
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
