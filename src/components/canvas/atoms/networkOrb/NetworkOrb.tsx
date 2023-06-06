import { useRef } from 'react';
import { Group } from 'three';
import { folder, useControls } from 'leva';

interface Props {
  orbColor: {
    red: number,
    green: number,
    blue: number,
  },
  orbOpacity: number,
  orbRadius: number,
  updateOrbColor: (channel: string, newColor: number) => void,
  updateOrbOpacity: (value: number) => void,
  updateOrbRadius: (value: number) => void,
}

export const NetworkOrb = ({ orbColor, orbOpacity, orbRadius, updateOrbColor, updateOrbRadius, updateOrbOpacity }: Props) => {
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
    color: folder({
      red: {
        value: 0.5,
        min: 0,
        max: 25,
        onChange: (value: number) => {
          updateOrbColor('red', value);
        }
      },
      green: {
        value: 0.5,
        min: 0,
        max: 25,
        onChange: (value: number) => {
          updateOrbColor('green', value);
        }
      },
      blue: {
        value: 0.5,
        min: 0,
        max: 25,
        onChange: (value: number) => {
          updateOrbColor('blue', value);
        }
      }
    })
  });

  return (
    <group ref={ref}>
      <mesh
        castShadow={true}
      >
        <sphereGeometry args={[orbRadius, 32, 32]}/>
        <meshStandardMaterial
          color={[orbColor.red, orbColor.green, orbColor.blue]}
          transparent={true}
          opacity={orbOpacity}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
};
