import React, { Suspense, useEffect, useRef } from 'react';
import { NetworkModel } from '../../canvas/organisms/networkModel/NetworkModel';
import useNetworkState from './useNetworkState';
import { button, folder, useControls } from 'leva';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, useKeyboardControls } from '@react-three/drei';
import { Physics, RapierRigidBody, RigidBody } from '@react-three/rapier';
import { RESOURCE } from './types';
import animationInterval from '../../../utils/animation-interval';

export const NetworkController = () => {
  const body = useRef<RapierRigidBody>(null);
  const [, getKeys] = useKeyboardControls();
  const {
    // General
    generateNetwork,
    radius,
    vertexNumber,
    updateVertexNumber,
    vertexPlacementChaosFactor,
    updateVertexPlacementChaosFactor,
    playerColors,

    // Edges
    edgeNeighbours,
    maxEdgeLengthPercentage,
    updateMaxEdgeLengthPercentage,

    // Vertices
    vertices,

    // Orb
    orbOpacity,
    updateOrbOpacity,
    orbRadius,
    updateOrbRadius,

    // HackBots
    hackBots,
    createHackBot,
    removeHackBot,

    // Resources
    resourcesPerSecond,
    updateResource,

    // Time
    startMatch,
    endMatch,
    resetMatch,
  } = useNetworkState();

  // Init Vertices
  useEffect(() => {
    generateNetwork();
    startMatch();
  }, [vertexNumber, vertexPlacementChaosFactor, maxEdgeLengthPercentage]);

  useEffect(() => {
    console.log({ edgeNeighbours });
  }, [edgeNeighbours]);

  useEffect(() => {
    // TODO: Does putting this in its own useEffect create
    //  a new animationInterval whenever resourcesPerSecond is updated?
    const abortController = new AbortController();
    animationInterval(
      1000,
      abortController.signal,
      () => Object
        .values(RESOURCE)
        .forEach((resource) =>
          resourcesPerSecond[resource]
          && updateResource(RESOURCE[resource], resourcesPerSecond[resource])
        )
    );
    return () => abortController.abort();
  }, [resourcesPerSecond]);

  // Debug
  useControls('Network Model', {
    match: folder({
      endMatch: button(() => {
        endMatch();
      }),
      newMatch: button(() => {
        resetMatch();
        generateNetwork();
        startMatch();
      }),
    }),
    maxEdgeLengthPercentage: {
      value: maxEdgeLengthPercentage,
      min: 0,
      max: 1,
      onChange: (value: number) => {
        updateMaxEdgeLengthPercentage(value);
      }
    },
    vertexNumber: {
      value: vertexNumber,
      min: 0,
      max: 100,
      step: 1,
      onChange: (value: number) => {
        updateVertexNumber(value);
      }
    },
    vertexPlacementChaosFactor: {
      value: 350,
      min: 0,
      max: 1000,
      onChange: (value: number) => {
        updateVertexPlacementChaosFactor(value);
      }
    }
  });

  // Rotate Orb on Keypress
  useFrame((state, delta) => {
    const { upward, downward, leftward, rightward } = getKeys();

    const torque = { x: 0, y: 0, z: 0 };
    const torqueStrength = 4000 * delta;

    if (upward) {
      torque.x += torqueStrength;
    }

    if (downward) {
      torque.x -= torqueStrength;
    }

    if (leftward) {
      torque.y += torqueStrength;
    }

    if (rightward) {
      torque.y -= torqueStrength;
    }

    body.current?.applyTorqueImpulse(torque, true);
  });

  return (
    <Suspense fallback={null}>
      <OrbitControls />
      <Physics gravity={[0, 10, 0]}>
        <RigidBody
          ref={body}
          lockTranslations={true}
          position={[0, 0, 0]}
          restitution={200}
          friction={0.02}
          linearDamping={2}
          angularDamping={8}
        >
          <NetworkModel
            edgeNeighbours={edgeNeighbours}
            playerColors={playerColors}
            hackBots={hackBots}
            createHackBot={createHackBot}
            removeHackBot={removeHackBot}
            maxEdgeLengthPercentage={maxEdgeLengthPercentage}
            orbOpacity={orbOpacity}
            orbRadius={orbRadius}
            radius={radius}
            updateOrbOpacity={updateOrbOpacity}
            updateOrbRadius={updateOrbRadius}
            vertices={vertices}
          />
        </RigidBody>
      </Physics>
    </Suspense>
  );
};
