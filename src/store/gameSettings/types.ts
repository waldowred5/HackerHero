export interface GameSettingState {
  bloomEnabled: boolean,

  // Actions
  updateBloomEnabled: (bloomEnabled: boolean) => void,
}
