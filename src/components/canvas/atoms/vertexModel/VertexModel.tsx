import { useRef } from 'react';
import * as THREE from 'three';
import { Group, Mesh } from 'three';
import { Text } from '@react-three/drei';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { Vertex } from '@/store/vertex/types';
import { PLAYER } from '@/store/player/types';

interface Props {
  handleHackBotCreation: (vertexId: string, player: PLAYER) => void,
  handleHackBotDeletion: (vertexId: string) => void,
  vertex: Vertex,
  uuid: string,
}

export const VertexModel = ({ handleHackBotCreation, handleHackBotDeletion, vertex, uuid }: Props) => {
  const ref = useRef<Mesh | null>(null);
  const textRef = useRef<Group | null>(null);
  const { owner } = vertex;

  useFrame((state) => {
    const { camera } = state;

    // @ts-ignore
    textRef.current?.lookAt(camera.position);
  });

  // TODO: Use raycaster and test for first intersection with a
  //  vertex to prevent placing / removing 2 HackBots at once
  const leftClickHandler = () => {
    handleHackBotCreation(vertex.uuid, PLAYER.PLAYER_1);
  };

  const rightClickHandler = () => {
    if (!vertex.hackBotId) {
      console.log('No HackBot to remove!');

      return;
    }

    handleHackBotDeletion(vertex.uuid);
  };

  const changeVertexColor = (event: ThreeEvent<PointerEvent>, color: string) => {
    // @ts-ignore
    event.eventObject.material.color = new THREE.Color(color);
  };

  return (
    <>
      {
        <>
          <mesh
            ref={ref}
            position={vertex.vector}
            onClick={() => leftClickHandler()}
            onContextMenu={() => rightClickHandler()}
            onPointerEnter={(event) => changeVertexColor(event, owner === PLAYER.PLAYER_1 ? 'cyan' : 'white')}
            onPointerLeave={(event) => changeVertexColor(event, owner === PLAYER.PLAYER_1 ? 'blue' : 'grey')}
          >
            <sphereGeometry args={[0.12, 32, 32]}/>
            <meshBasicMaterial
              color={owner === PLAYER.PLAYER_1 ? 'blue' : 'grey'}
            />
          </mesh>
          <group
            ref={textRef}
            position={[
              vertex.vector.x * 1.15,
              vertex.vector.y * 1.15,
              vertex.vector.z * 1.15,
            ]}>
            <Text
              font="./fonts/bangers-v20-latin-regular.woff"
              fontSize={0.1}
            >
              {uuid.substring(0, 4)}
            </Text>
          </group>
        </>
      }
    </>
  );
};
