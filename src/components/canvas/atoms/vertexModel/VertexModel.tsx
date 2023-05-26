import React, { useRef } from 'react';
import * as THREE from 'three';
import { Group, Mesh } from 'three';
import { Text } from '@react-three/drei';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import {
  HackBotProps,
  Vertex
} from '../../../controllers/networkController/types';

interface Props {
  createHackBot: ({ vertex }: HackBotProps) => void,
  removeHackBot: (uuid: string) => void,
  vertex: Vertex,
  uuid: string,
}

export const VertexModel = ({ createHackBot, removeHackBot, vertex, uuid }: Props) => {
  const ref = useRef<Mesh | null>(null);
  const textRef = useRef<Group | null>(null);
  const { highlight } = vertex;

  useFrame((state) => {
    const { camera } = state;

    textRef.current?.lookAt(camera.position);
  });

  // TODO: Use raycaster and test for first intersection with a
  //  vertex to prevent placing / removing 2 HackBots at once
  const leftClickHandler = () => {
    createHackBot({ vertex });
  };

  const rightClickHandler = () => {
    if (!vertex.hackBot) {
      console.log('No HackBot to remove!');

      return;
    }

    removeHackBot(vertex.hackBot.uuid);
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
            onPointerEnter={(event) => changeVertexColor(event, highlight ? 'cyan' : 'white')}
            onPointerLeave={(event) => changeVertexColor(event, highlight ? 'blue' : 'grey')}
          >
            <sphereGeometry args={[0.12, 32, 32]}/>
            <meshStandardMaterial
              color={highlight ? 'blue' : 'grey'}
              side={THREE.DoubleSide}
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