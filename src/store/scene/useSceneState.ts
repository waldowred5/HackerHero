import { create } from 'zustand';
import { SCENE } from '@/store/scene/types';

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
