export enum SCENE {
  GAME_OVER = 'GAME_OVER',
  LOADING = 'LOADING',
  MAIN_MENU = 'MAIN_MENU',
  MATCH = 'MATCH',
}

export interface SceneState {
  scene: keyof typeof SCENE,
  updateScene: (newScene: keyof typeof SCENE) => void,
}
