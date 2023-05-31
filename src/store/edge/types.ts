export interface EdgeState {
  maxEdgeLengthPercentage: number,

  // Actions
  updateMaxEdgeLengthPercentage: (newMaxEdgeLengthPercentage: number) => void,
}
