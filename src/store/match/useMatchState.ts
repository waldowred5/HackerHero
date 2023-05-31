import { create } from 'zustand';
import { MATCH_PHASE, MatchState } from '@/store/match/types';
import { RESOURCE } from '@/store/resource/types';
import useResourceState from '@/store/resource/useResourceState';

export default create<MatchState>((set, get) => {
  return {
    matchPhase: MATCH_PHASE.PRE_MATCH,
    matchStartTime: 0,
    matchEndTime: 0,

    // Actions
    startMatch: () => {
      set((state) => {
        if (state.matchPhase === MATCH_PHASE.PRE_MATCH) {
          return {
            matchPhase: MATCH_PHASE.ACTIVE_MATCH,
            matchStartTime: Date.now(),
          };
        }

        return {};
      });
    },

    endMatch: () => {
      if (get().matchPhase === MATCH_PHASE.ACTIVE_MATCH) {
        useResourceState.getState().setResourcesPerSecond(RESOURCE.HACKING_POWER, 0);
        useResourceState.getState().setResourcesPerSecond(RESOURCE.COMPUTE_POWER, 0);

        set(() => {
          return {
            matchPhase: MATCH_PHASE.POST_MATCH,
            matchEndTime: Date.now(),
          };
        });
      }
    },

    resetMatch: () => {
      if (get().matchPhase === MATCH_PHASE.ACTIVE_MATCH || get().matchPhase === MATCH_PHASE.POST_MATCH) {
        useResourceState.getState().setResource(RESOURCE.HACKING_POWER, 275);
        useResourceState.getState().setResource(RESOURCE.COMPUTE_POWER, 0);
        useResourceState.getState().setResourcesPerSecond(RESOURCE.HACKING_POWER, 0);
        useResourceState.getState().setResourcesPerSecond(RESOURCE.COMPUTE_POWER, 0);

        set(() => {
          return {
            matchPhase: MATCH_PHASE.PRE_MATCH,
          };
        });
      }
    },
  };
});
