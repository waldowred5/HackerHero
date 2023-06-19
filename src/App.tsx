import { Loader } from '@react-three/drei';
import { Leva } from 'leva';
import { KeyboardInputManager } from './components/managers/keyboardInputManager/KeyboardInputManager';
import { InterfaceManager } from './components/ui/interfaceManager/InterfaceManager';
import { Canvas } from '@react-three/fiber';
import { SceneManager } from './components/managers/sceneManager/SceneManager';
import { useEffect } from 'react';
import { Perf } from 'r3f-perf';

import useGameSettingState from '@/store/gameSettings/useGameSettingState';
import { shallow } from 'zustand/shallow';


export const App = () => {
  useEffect(() => {
    document.addEventListener('contextmenu', event => event.preventDefault());
  }, []);

  const {
    statsDebugPanelEnabled,
  } = useGameSettingState((state) => {
    return {
      statsDebugPanelEnabled: state.statsDebugPanelEnabled,
    };
  }, shallow);

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
          camera={{
            fov: 75,
            near: 0.1,
            far: 200,
            position: [0, 0, 5],
          }}
        >
          {
            statsDebugPanelEnabled && <Perf
              position='bottom-right'
            />
          }
          <SceneManager/>
        </Canvas>
      </KeyboardInputManager>
    </>
  );
};
