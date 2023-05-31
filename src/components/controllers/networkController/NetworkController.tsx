import { Suspense, useEffect, useRef } from 'react';
import { NetworkModel } from '../../canvas/organisms/networkModel/NetworkModel';
import { button, folder, useControls } from 'leva';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, useKeyboardControls } from '@react-three/drei';
import { Physics, RapierRigidBody, RigidBody } from '@react-three/rapier';
import animationInterval from '../../../utils/animation-interval';
import useMatchState from '@/store/match/useMatchState';
import useEdgeState from '@/store/edge/useEdgeState';
import { RESOURCE } from '@/store/resource/types';
import useResourceState from '@/store/resource/useResourceState';
import useRelationState from '@/store/relation/useRelationState';
import usePlayerState from '@/store/player/usePlayerState';
import useHackBotState from '@/store/hackBot/useHackBotState';
import useNetworkState from '@/store/network/useNetworkState';
import useVertexState from '@/store/vertex/useVertexState';
import { shallow } from 'zustand/shallow';

export const NetworkController = () => {
  const body = useRef<RapierRigidBody | null>(null);
  const [, getKeys] = useKeyboardControls();

  const {
    maxEdgeLengthPercentage,
    updateMaxEdgeLengthPercentage,
  } = useEdgeState((state) => {
    return {
      maxEdgeLengthPercentage: state.maxEdgeLengthPercentage,
      updateMaxEdgeLengthPercentage: state.updateMaxEdgeLengthPercentage,
    };
  }, shallow);

  const {
    hackBots,
    createHackBot,
    deleteHackBot,
  } = useHackBotState((state) => {
    return {
      hackBots: state.hackBots,
      createHackBot: state.createHackBot,
      deleteHackBot: state.deleteHackBot,
    };
  }, shallow);

  const {
    startMatch,
    endMatch,
    resetMatch,
  } = useMatchState((state) => {
    return {
      startMatch: state.startMatch,
      endMatch: state.endMatch,
      resetMatch: state.resetMatch,
    };
  }, shallow);

  const {
    orbOpacity,
    orbRadius,
    radius,
    createNetwork,
    updateOrbOpacity,
    updateOrbRadius,
  } = useNetworkState((state) => {
    return {
      orbOpacity: state.orbOpacity,
      orbRadius: state.orbRadius,
      radius: state.radius,
      createNetwork: state.createNetwork,
      updateOrbOpacity: state.updateOrbOpacity,
      updateOrbRadius: state.updateOrbRadius,
    };
  }, shallow);

  const {
    playerColors,
  } = usePlayerState((state) => {
    return {
      playerColors: state.playerColors,
    };
  }, shallow);

  const {
    adjacencyMap,
    edgeNeighbours,
  } = useRelationState((state) => {
    return {
      adjacencyMap: state.adjacencyMap,
      edgeNeighbours: state.edgeNeighbours,
    };
  }, shallow);

  const {
    resourcesPerSecond,
    updateResource,
  } = useResourceState((state) => {
    return {
      resourcesPerSecond: state.resourcesPerSecond,
      updateResource: state.updateResource,
    };
  }, shallow);

  const {
    vertexNumber,
    vertexPlacementChaosFactor,
    vertices,
    updateVertexPlacementChaosFactor,
    updateVertexNumber,
  } = useVertexState((state) => {
    return {
      vertexNumber: state.vertexNumber,
      vertexPlacementChaosFactor: state.vertexPlacementChaosFactor,
      vertices: state.vertices,
      updateVertexPlacementChaosFactor: state.updateVertexPlacementChaosFactor,
      updateVertexNumber: state.updateVertexNumber,
    };
  }, shallow);

  // Init Vertices
  useEffect(() => {
    resetMatch();
    createNetwork();
    startMatch();
  }, [vertexNumber, vertexPlacementChaosFactor, maxEdgeLengthPercentage]);

  useEffect(() => {
    console.log({ adjacencyMap });
    console.log({ edgeNeighbours });
  }, [adjacencyMap, edgeNeighbours]);

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
        createNetwork();
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
            deleteHackBot={deleteHackBot}
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
