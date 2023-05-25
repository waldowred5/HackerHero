import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Group } from 'three';
import { useFrame } from '@react-three/fiber';

interface Props {
  vector: THREE.Vector3,
}

export const HackBotModel = ({ vector }: Props) => {
  const ref = useRef<Group | null>(null);

  useEffect(() => {
    ref.current?.lookAt(0, 0, 0);
  }, []);

  useFrame(() => {
    ref.current?.rotateZ(0.01);
  });

  return (
    <group
      ref={ref}
      position={[vector.x * 1.05, vector.y * 1.05, vector.z * 1.05]}
    >
      <mesh>
        <octahedronGeometry args={[0.15, 0]}/>
        <meshStandardMaterial
          color={'cyan'}
        />
      </mesh>
    </group>
  );
};
