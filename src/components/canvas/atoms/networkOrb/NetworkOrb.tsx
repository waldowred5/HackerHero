import React, { useRef } from 'react';
import { Group, WebGLCubeRenderTarget } from 'three';
import { useControls } from 'leva';
import { useThree } from '@react-three/fiber';

interface Props {
  orbOpacity: number,
  updateOrbOpacity: (value: number) => void,
  orbRadius: number,
  updateOrbRadius: (value: number) => void,
}

export const NetworkOrb = ({ orbOpacity, updateOrbRadius, orbRadius, updateOrbOpacity }: Props) => {
  const ref = useRef<Group | null>(null);
  // const { scene, gl } = useThree();
  // const cubeRenderTarget = new WebGLCubeRenderTarget(256, {
  //   format: THREE.RGBFormat,
  //   generateMipmaps: true,
  //   minFilter: LinearMipmapLinearFilter,
  // });
  // const cubeCamera = new CubeCamera(1, 1000, cubeRenderTarget);
  // cubeCamera.position.set(0, 100, 0);

  // Debug
  useControls('NetworkOrb', {
    opacity: {
      value: orbOpacity,
      min: 0,
      max: 1,
      onChange: (value: number) => {
        updateOrbOpacity(value);
      }
    },
    radius: {
      value: orbRadius,
      min: 0,
      max: 5,
      onChange: (value: number) => {
        updateOrbRadius(value);
      }
    },
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[orbRadius, 32, 32]}/>
        <meshStandardMaterial
          color={'purple'}
          transparent={true}
          opacity={orbOpacity}
        />
      </mesh>
    </group>
  );
};
