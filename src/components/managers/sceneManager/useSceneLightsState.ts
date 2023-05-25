import { create } from 'zustand';

type Light = {
  color: number,
  intensity: number,
  distance: number,
  x: number,
  y: number,
  z: number,
}

interface SceneState {
  lights: Light[],
}

export default create<SceneState>(() => {
  return {
    lights: [
      { color: 0xf100ff, intensity: 6, distance: 12, x: 1, y: 0, z: 10 },
      { color: 0xc56cef, intensity: 6, distance: 12, x: -2, y: 1, z: -10 },
      { color: 0xc56cef, intensity: 5, distance: 10, x: 0, y: 10, z: 1 },
      { color: 0x00ffdd, intensity: 8, distance: 12, x: 0, y: -10, z: -1 },
      { color: 0x16a7f5, intensity: 6, distance: 12, x: 10, y: 3, z: 0 },
      { color: 0x0095ff, intensity: 6, distance: 12, x: -10, y: -1, z: 0 },
    ],
  };
});
