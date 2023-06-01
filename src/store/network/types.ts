export interface NetworkState {
  orbOpacity: number,
  orbRadius: number,
  radius: number,

  // Actions
  createNetwork: () => void,
  updateOrbOpacity: (newOpacity: number) => void,
  updateOrbRadius: (newRadius: number) => void,
}
