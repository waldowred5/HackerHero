import { create } from 'zustand';
import { SCENE, SceneState } from '@/store/scene/types';

export default create<SceneState>((set) => {
  return {
    scene: SCENE.MATCH,

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
