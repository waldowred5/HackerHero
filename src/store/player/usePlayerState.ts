import { create } from 'zustand';
import { PLAYER, PlayerState } from '@/store/player/types';

export default create<PlayerState>((set, get) => {
  return {
    playerColors: {
      [PLAYER.NEUTRAL]: 'lightgrey',
      [PLAYER.PLAYER_1]: 'blue',
      [PLAYER.PLAYER_2]: 'red',
    },
  };
});
