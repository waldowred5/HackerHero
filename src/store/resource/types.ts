export enum RESOURCE {
  HACKING_POWER = 'HACKING_POWER',
  COMPUTE_POWER = 'COMPUTE_POWER',
}

export interface ResourceState {
  resources: {
    [key: string]: number,
    [key: string]: number,
  }

  resourcesPerSecond: {
    [key: string]: number,
    [key: string]: number,
  }

  // Actions
  setResource: (resource: RESOURCE, amount: number) => void,
  setResourcesPerSecond: (resource: RESOURCE, amount: number) => void,
  updateResource: (resource: RESOURCE, amount: number) => void,
  updateResourcesPerSecond: (resource: RESOURCE, amount: number) => void,
}
