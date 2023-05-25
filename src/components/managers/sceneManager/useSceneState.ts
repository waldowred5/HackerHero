import { create } from 'zustand';

export enum SCENE {
  GAME_OVER = 'GAME_OVER',
  LOADING = 'LOADING',
  MAIN_MENU = 'MAIN_MENU',
  MATCH = 'MATCH',
}

interface SceneState {
  scene: keyof typeof SCENE,
  updateScene: (newScene: keyof typeof SCENE) => void,
}

export default create<SceneState>((set) => {
  return {
    scene: SCENE.MAIN_MENU,

    // Actions
    updateScene: (newScene: keyof typeof SCENE) => {
      set(() => {
        return {
          scene: newScene,
        };
      });
    }
  };
});
