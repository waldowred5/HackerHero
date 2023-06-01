import { create } from 'zustand';
import { RESOURCE, ResourceState } from '@/store/resource/types';

export default create<ResourceState>((set) => {
  return {
    resources: {
      [RESOURCE.HACKING_POWER]: 275,
      [RESOURCE.COMPUTE_POWER]: 0,
    },

    resourcesPerSecond: {
      [RESOURCE.HACKING_POWER]: 0,
      [RESOURCE.COMPUTE_POWER]: 0,
    },

    // Actions
    setResource: (resource: RESOURCE, amount: number) => {
      set((state) => {
        return {
          resources: {
            ...state.resources,
            [resource]: amount,
          },
        };
      });
    },

    setResourcesPerSecond: (resource: RESOURCE, amount: number) => {
      set((state) => {
        return {
          resourcesPerSecond: {
            ...state.resourcesPerSecond,
            [resource]: amount,
          },
        };
      });
    },

    updateResource: (resource: RESOURCE, amount: number) => {
      set((state) => {
        return {
          resources: {
            ...state.resources,
            [resource]: state.resources[resource] + amount,
          },
        };
      });
    },

    updateResourcesPerSecond: (resource: RESOURCE, amount: number) => {
      set((state) => {
        return {
          resourcesPerSecond: {
            ...state.resourcesPerSecond,
            [resource]: state.resourcesPerSecond[resource] + amount,
          },
        };
      });
    },
  };
});
