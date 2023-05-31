export enum MATCH_PHASE {
  PRE_MATCH = 'PRE_MATCH',
  ACTIVE_MATCH = 'ACTIVE_MATCH',
  POST_MATCH = 'POST_MATCH',
}

export interface MatchState {
  matchPhase: keyof typeof MATCH_PHASE,
  matchStartTime: number,
  matchEndTime: number,

  // Actions
  startMatch: () => void,
  endMatch: () => void,
  resetMatch: () => void,
}
