export interface NetworkState {
  orbColor: {
    red: number,
    green: number,
    blue: number,
  },
  orbOpacity: number,
  orbRadius: number,
  radius: number,

  // Actions
  createNetwork: () => void,
  updateOrbColor: (channel: string, newColor: number) => void,
  updateOrbOpacity: (newOpacity: number) => void,
  updateOrbRadius: (newRadius: number) => void,
}
