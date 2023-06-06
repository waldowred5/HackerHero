import { PLAYER } from '@/store/player/types';

export enum RESOURCE {
  HACKING_POWER = 'HACKING_POWER',
  COMPUTE_POWER = 'COMPUTE_POWER',
  NONE = 'NONE',
}

export interface ResourceState {
  resources: {
    [key: string]: {
      [key: string]: number,
      [key: string]: number,
      [key: string]: number,
    },
    [key: string]: {
      [key: string]: number,
      [key: string]: number,
      [key: string]: number,
    },
  }

  resourcesPerSecond: {
    [key: string]: {
      [key: string]: number,
      [key: string]: number,
      [key: string]: number,
    },
    [key: string]: {
      [key: string]: number,
      [key: string]: number,
      [key: string]: number,
    },
  }

  // Actions
  setResource: (resource: RESOURCE, player: PLAYER, amount: number) => void,
  setResourcesPerSecond: (resource: RESOURCE, player: PLAYER, amount: number) => void,
  updateResource: (resource: RESOURCE, player: PLAYER, amount: number) => void,
  updateResourcesPerSecond: (resource: RESOURCE, player: PLAYER, amount: number) => void,
}
