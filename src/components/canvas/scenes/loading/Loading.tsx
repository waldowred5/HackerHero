import { useEffect } from 'react';
import { Text } from '@react-three/drei';
import useSceneState from '@/store/scene/useSceneState';
import { SCENE } from '@/store/scene/types';

export const Loading = () => {
  const { updateScene } = useSceneState();

  useEffect(() => {
    setTimeout(() => updateScene(SCENE.MATCH), 800);
  }, []);

  return (
    <Text
      font="./fonts/bangers-v20-latin-regular.woff"
      fontSize={1}
      position={[0, 0, 0]}
      rotation-y={Math.PI * 2}
      textAlign="center"
      color={'lightBlue'}
    >
      Loading...
    </Text>
  );
};
