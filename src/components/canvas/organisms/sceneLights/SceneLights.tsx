import { useRef } from 'react';
import { PointLight } from 'three';
import useSceneLightsState from '../../../managers/sceneManager/useSceneLightsState';

// TODO: Replace point lights with shaders and keep this for shining lights on 3d ui elements
export const SceneLights = () => {
  const { lights } = useSceneLightsState();

  return (
    <>
      <ambientLight
        color={0xFFFFFF}
        intensity={0.3}
      />
      {
        lights.map((light) => {
          const { color, intensity, distance, x, y, z } = light;
          const lightRef = useRef<PointLight | null>(null);

          return (
            <pointLight
              key={`Light ${light.color}: ${light.x}, ${light.y}, ${light.z}`}
              ref={lightRef}
              color={color}
              intensity={intensity}
              distance={distance}
              position={[x, y, z]}
            />
          );
        })
      }
    </>
  );
};
