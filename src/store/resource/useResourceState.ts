import { create } from 'zustand';
import { RESOURCE, ResourceState } from '@/store/resource/types';
import { PLAYER } from '@/store/player/types';

export default create<ResourceState>((set) => {
  return {
    resources: {
      [PLAYER.PLAYER_1]: {
        [RESOURCE.HACKING_POWER]: 400,
        [RESOURCE.COMPUTE_POWER]: 0,
        [RESOURCE.NONE]: 0,
      },
      [PLAYER.PLAYER_2]: {
        [RESOURCE.HACKING_POWER]: 400,
        [RESOURCE.COMPUTE_POWER]: 0,
        [RESOURCE.NONE]: 0,
      }
    },

    resourcesPerSecond: {
      [PLAYER.PLAYER_1]: {
        [RESOURCE.HACKING_POWER]: 1,
        [RESOURCE.COMPUTE_POWER]: 0,
        [RESOURCE.NONE]: 0,
      },
      [PLAYER.PLAYER_2]: {
        [RESOURCE.HACKING_POWER]: 1,
        [RESOURCE.COMPUTE_POWER]: 0,
        [RESOURCE.NONE]: 0,
      }
    },

    // Actions
    setResource: (resource: RESOURCE, player: PLAYER, amount: number) => {
      set((state) => {
        return {
          resources: {
            ...state.resources,
            [player]: {
              ...state.resources[player],
              [resource]: amount,
            }
          },
        };
      });
    },

    setResourcesPerSecond: (resource: RESOURCE, player: PLAYER, amount: number) => {
      set((state) => {
        return {
          resourcesPerSecond: {
            ...state.resourcesPerSecond,
            [player]: {
              ...state.resourcesPerSecond[player],
              [resource]: amount,
            }
          },
        };
      });
    },

    updateResource: (resource: RESOURCE, player: PLAYER, amount: number) => {
      set((state) => {
        return {
          resources: {
            ...state.resources,
            [player]: {
              ...state.resources[player],
              [resource]: state.resources[player][resource] + amount,
            }
          },
        };
      });
    },

    updateResourcesPerSecond: (resource: RESOURCE, player: PLAYER, amount: number) => {
      set((state) => {
        return {
          resourcesPerSecond: {
            ...state.resourcesPerSecond,
            [player]: {
              ...state.resourcesPerSecond[player],
              [resource]: state.resourcesPerSecond[player][resource] + amount,
            }
          },
        };
      });
    },
  };
});
