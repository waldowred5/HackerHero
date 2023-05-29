import React from 'react';
import { useThree } from '@react-three/fiber';
import { CubeTextureLoader, Texture } from 'three';

export const SkyBox = () => {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();
  // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
  const texture: Texture = loader
    .setPath('./src/assets/skybox/cyberpunkSkyscraperOffice/')
    .load([
      'px.png',
      'nx.png',
      'py.png',
      'ny.png',
      'pz.png',
      'nz.png'
    ]);

  // Background generated at: https://www.blockadelabs.com/
  // Panorama to Cubemap generated at: https://jaxry.github.io/panorama-to-cubemap/

  scene.background = texture;

  return null;
};
