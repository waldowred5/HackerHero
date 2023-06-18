import { useRef } from 'react';
import { Group } from 'three';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Vertex } from '@/store/vertex/types';

interface Props {
  vertex: Vertex,
  uuid: string,
}

export const VertexModelLabel = ({ vertex, uuid }: Props) => {
  const textRef = useRef<Group | null>(null);

  useFrame((state) => {
    textRef.current?.lookAt(state.camera.position);
  });

  return (
    <>
      <group
        ref={textRef}
        position={[
          vertex.vector.x / 1.08,
          vertex.vector.y / 1.08,
          vertex.vector.z / 1.08,
        ]}>
        <Text
          font="./fonts/bangers-v20-latin-regular.woff"
          fontSize={0.06}
        >
          {uuid.substring(0, 4)}
        </Text>
      </group>
    </>
  );
};
