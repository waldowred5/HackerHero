import { useEffect, useRef, useState } from 'react';
import { Group } from 'three';
import { Text , Instance } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Vertex } from '@/store/vertex/types';
import { PLAYER, PLAYER_COLOR } from '@/store/player/types';
import { HackBotVertexMap } from '@/store/relation/types';

interface Props {
  hackBotVertexMap: HackBotVertexMap,
  handleHackBotCreation: (vertexId: string) => void,
  handleHackBotDeletion: (vertexId: string) => void,
  playerColors: PLAYER_COLOR,
  vertex: Vertex,
  uuid: string,
}

export const InstancedVertexModel = ({ hackBotVertexMap, handleHackBotCreation, handleHackBotDeletion, playerColors, vertex, uuid }: Props) => {
  const ref = useRef<Instance | null>(null);
  const textRef = useRef<Group | null>(null);
  const owner = hackBotVertexMap[vertex.uuid].owner;
  const [currentColor, setCurrentColor] = useState();

  useEffect(() => {
    setCurrentColor(playerColors[PLAYER[owner]].vertex);
  }, [owner]);

  useFrame((state) => {
    const { camera } = state;

    // @ts-ignore
    textRef.current?.lookAt(camera.position);
  });

  const leftClickHandler = () => {
    handleHackBotCreation(vertex.uuid);
  };

  const rightClickHandler = () => {
    if (!hackBotVertexMap[vertex.uuid].hackBotId) {
      console.log('No HackBot to remove!');

      return;
    }

    handleHackBotDeletion(vertex.uuid);
  };

  return (
    <>
      {
        <>
          <Instance
            ref={ref}
            position={vertex.vector}
            color={currentColor}
            onClick={() => leftClickHandler()}
            onContextMenu={() => rightClickHandler()}
            onPointerEnter={() => setCurrentColor(playerColors[PLAYER[owner]].hackBot)}
            onPointerLeave={() => setCurrentColor(playerColors[PLAYER[owner]].vertex)}
          />
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
      }
    </>
  );
};
