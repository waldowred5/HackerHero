import { create } from 'zustand';
import { GameSettingState } from '@/store/gameSettings/types';

export default create<GameSettingState>((set) => {
  return {
    bloomEnabled: false,
    statsDebugPanelEnabled: true,

    // Actions
    updateBloomEnabled: (bloomEnabled: boolean) => {
      set({
        bloomEnabled,
      });
    },

    updateStatsDebugPanelEnabled: (statsDebugPanelEnabled: boolean) => {
      set({
        statsDebugPanelEnabled,
      });
    }
  };
});
