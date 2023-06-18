export interface GameSettingState {
  bloomEnabled: boolean,
  statsDebugPanelEnabled: boolean,

  // Actions
  updateBloomEnabled: (bloomEnabled: boolean) => void,
  updateStatsDebugPanelEnabled: (statsDebugPanelEnabled: boolean) => void,
}
