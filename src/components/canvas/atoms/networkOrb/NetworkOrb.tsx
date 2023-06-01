import { useRef } from 'react';
import { Group } from 'three';
import { useControls } from 'leva';

interface Props {
  orbOpacity: number,
  updateOrbOpacity: (value: number) => void,
  orbRadius: number,
  updateOrbRadius: (value: number) => void,
}

export const NetworkOrb = ({ orbOpacity, updateOrbRadius, orbRadius, updateOrbOpacity }: Props) => {
  const ref = useRef<Group | null>(null);

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
