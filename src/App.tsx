import { Loader } from '@react-three/drei';
import { Leva } from 'leva';
import { KeyboardInputManager } from './components/managers/keyboardInputManager/KeyboardInputManager';
import { InterfaceManager } from './components/ui/interfaceManager/InterfaceManager';
import { Canvas } from '@react-three/fiber';
import { SceneManager } from './components/managers/sceneManager/SceneManager';
import { useEffect } from 'react';

export const App = () => {
  useEffect(() => {
    document.addEventListener('contextmenu', event => event.preventDefault());
  }, []);

  return (
    <>
      <Loader/>

      <Leva
        collapsed={true}
        hidden={false}
      />

      <KeyboardInputManager>
        <InterfaceManager/>

        {/* TODO: Extract camera to camera manager component */}
        <Canvas
          shadows
          // style={{ position: 'static' }}
          camera={{
            fov: 75,
            near: 0.1,
            far: 200,
            position: [0, 0, 5],
          }}
        >
          <SceneManager/>
        </Canvas>
      </KeyboardInputManager>
    </>
  );
};
