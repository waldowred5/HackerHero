import { KeyboardControls } from '@react-three/drei';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const KeyboardInputManager = ({ children }: Props) => {
  return (
    <KeyboardControls
      map={[
        { name: 'upward', keys: ['ArrowUp', 'KeyW'] },
        { name: 'downward', keys: ['ArrowDown', 'KeyS'] },
        { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
        { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
      ]}
    >
      { children }
    </KeyboardControls>
  );
};
