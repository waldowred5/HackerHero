import React, { useState } from 'react';
import useScene, { SCENE } from '../../../managers/sceneManager/useSceneState';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

export const GameOver = () => {
  const { updateScene } = useScene();
  const [textColor, setTextColor] = useState<THREE.Color>(new THREE.Color('grey'));

  return (
    <>
      <Text
        font="./fonts/bangers-v20-latin-regular.woff"
        fontSize={0.5}
        position={[0, 1, 0]}
        rotation-y={Math.PI * 2}
        textAlign="center"
        color={'gold'}
      >
        Game Over
      </Text>
      <Text
        font="./fonts/bangers-v20-latin-regular.woff"
        fontSize={1}
        position={[0, 0, 0]}
        rotation-y={Math.PI * 2}
        textAlign="center"
        color={'gold'}
      >
        You Lost
      </Text>
      <Text
        font="./fonts/bangers-v20-latin-regular.woff"
        fontSize={1}
        position={[0, -1.5, 0]}
        rotation-y={Math.PI * 2}
        textAlign="center"
        color={textColor}
        onPointerEnter={() => setTextColor(new THREE.Color('white'))}
        onPointerLeave={() => setTextColor(new THREE.Color('grey'))}
        onClick={() => updateScene(SCENE.LOADING)}
      >
        PLAY AGAIN?
      </Text>
    </>
  );
};
