import { useState } from 'react';
import useScene from '@/store/scene/useSceneState';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { SCENE } from '@/store/scene/types';

export const MainMenu = () => {
  const { updateScene } = useScene();
  const [textColor, setTextColor] = useState<THREE.Color>(new THREE.Color('grey'));

  return (
    <>
      <Text
        font="./fonts/bangers-v20-latin-regular.woff"
        fontSize={0.5}
        position={[0, 2, 0]}
        rotation-y={Math.PI * 2}
        textAlign="center"
        color={'gold'}
      >
        Main Menu
      </Text>
      <Text
        font="./fonts/bangers-v20-latin-regular.woff"
        fontSize={0.75}
        position={[0, 1.25, 0]}
        rotation-y={Math.PI * 2}
        textAlign="center"
        color={'gold'}
      >
        Hacker Hero
      </Text>
      <Text
        font="./fonts/bangers-v20-latin-regular.woff"
        fontSize={1}
        position={[0, -1, 0]}
        rotation-y={Math.PI * 2}
        textAlign="center"
        color={textColor}
        onPointerEnter={() => setTextColor(new THREE.Color('white'))}
        onPointerLeave={() => setTextColor(new THREE.Color('grey'))}
        onClick={() => updateScene(SCENE.LOADING)}
      >
        PLAY GAME
      </Text>
    </>
  );
};
