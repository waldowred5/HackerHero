import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Group } from 'three';
import { useFrame } from '@react-three/fiber';
import { PLAYER, PLAYER_COLOR } from '@/store/player/types';
import { HACK_BOT_CLASS_LIST } from '@/store/hackBot/types';

interface Props {
  hackBotClass: HACK_BOT_CLASS_LIST,
  owner: keyof typeof PLAYER,
  playerColors: PLAYER_COLOR,
  vector: THREE.Vector3,
}

export const HackBotModel = ({ hackBotClass, owner, playerColors, vector }: Props) => {
  const ref = useRef<Group | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (hackBotClass === HACK_BOT_CLASS_LIST.GENERATE_HACKING_POWER) {
      ref.current?.lookAt(0, 0, 0);
      ref.current?.rotateX(Math.PI / 2);
    }

    if (hackBotClass === HACK_BOT_CLASS_LIST.FLOOD_HACK) {
      ref.current?.lookAt(0, 0, 0);
    }
  }, []);

  useFrame(() => {
    if (!ref.current) {
      return;
    }

    if (hackBotClass === HACK_BOT_CLASS_LIST.GENERATE_HACKING_POWER) {
      ref.current?.rotateY(0.01);
    }

    if (hackBotClass === HACK_BOT_CLASS_LIST.FLOOD_HACK) {
      ref.current?.rotateZ(0.01);
    }
  });

  return (
    <group
      ref={ref}
      position={[vector.x * 1.04, vector.y * 1.04, vector.z * 1.04]}
    >
      {
        hackBotClass === HACK_BOT_CLASS_LIST.GENERATE_HACKING_POWER && <mesh>
          <torusGeometry args={[0.04, 0.012, 16, 32]}/>
          <meshStandardMaterial
            color={playerColors[PLAYER[owner]].hackBot} // TODO: Object key access
          />
        </mesh>
      }
      {
        hackBotClass === HACK_BOT_CLASS_LIST.FLOOD_HACK && <mesh>
          <octahedronGeometry args={[0.06, 0]}/>
          <meshStandardMaterial
            color={playerColors[PLAYER[owner]].hackBot} // TODO: Object key access
          />
        </mesh>
      }
    </group>
  );
};
