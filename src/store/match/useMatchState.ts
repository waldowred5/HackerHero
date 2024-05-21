import { create } from 'zustand';
import { MATCH_PHASE, MatchState } from '@/store/match/types';
import { RESOURCE } from '@/store/resource/types';
import useResourceState from '@/store/resource/useResourceState';
import { PLAYER } from '@/store/player/types';
import useRelationState from '@/store/relation/useRelationState';

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
        useResourceState.getState().setResourcesPerSecond(RESOURCE.HACKING_POWER, PLAYER.PLAYER_1, 0);
        useResourceState.getState().setResourcesPerSecond(RESOURCE.HACKING_POWER, PLAYER.PLAYER_2, 0);
        useResourceState.getState().setResourcesPerSecond(RESOURCE.COMPUTE_POWER, PLAYER.PLAYER_1, 0);
        useResourceState.getState().setResourcesPerSecond(RESOURCE.COMPUTE_POWER, PLAYER.PLAYER_2, 0);

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
        useResourceState.getState().setResource(RESOURCE.HACKING_POWER, PLAYER.PLAYER_1, 1400);
        useResourceState.getState().setResource(RESOURCE.HACKING_POWER, PLAYER.PLAYER_2, 1400);
        useResourceState.getState().setResource(RESOURCE.COMPUTE_POWER, PLAYER.PLAYER_1, 0);
        useResourceState.getState().setResource(RESOURCE.COMPUTE_POWER, PLAYER.PLAYER_2, 0);
        useResourceState.getState().setResourcesPerSecond(RESOURCE.HACKING_POWER, PLAYER.PLAYER_1, 1);
        useResourceState.getState().setResourcesPerSecond(RESOURCE.HACKING_POWER, PLAYER.PLAYER_2, 1);
        useResourceState.getState().setResourcesPerSecond(RESOURCE.COMPUTE_POWER, PLAYER.PLAYER_1, 0);
        useResourceState.getState().setResourcesPerSecond(RESOURCE.COMPUTE_POWER, PLAYER.PLAYER_2, 0);

        useRelationState.getState().createHackBotVertexMap();

        set(() => {
          return {
            matchPhase: MATCH_PHASE.PRE_MATCH,
          };
        });
      }
    },
  };
});
