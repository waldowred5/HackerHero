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
import { PLAYER } from '@/store/player/types';
import { HACK_BOT_CLASS_LIST } from '@/store/hackBot/types';

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
    updateSelectedHackBotBlueprint
  } = useHackBotState((state) => {
    return {
      hackBots: state.hackBots,
      createHackBot: state.createHackBot,
      deleteHackBot: state.deleteHackBot,
      updateSelectedHackBotBlueprint: state.updateSelectedHackBotBlueprint,
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
    orbColor,
    orbOpacity,
    orbRadius,
    radius,
    createNetwork,
    updateOrbColor,
    updateOrbOpacity,
    updateOrbRadius,
  } = useNetworkState((state) => {
    return {
      orbColor: state.orbColor,
      orbOpacity: state.orbOpacity,
      orbRadius: state.orbRadius,
      radius: state.radius,
      createNetwork: state.createNetwork,
      updateOrbColor: state.updateOrbColor,
      updateOrbOpacity: state.updateOrbOpacity,
      updateOrbRadius: state.updateOrbRadius,
    };
  }, shallow);

  const {
    playerColors,
    updateSelectedPlayer,
  } = usePlayerState((state) => {
    return {
      playerColors: state.playerColors,
      updateSelectedPlayer: state.updateSelectedPlayer,
    };
  }, shallow);

  const {
    adjacencyMap,
    edgeNeighbours,
    contestProgress,
    updateContestProgress,
  } = useRelationState((state) => {
    return {
      adjacencyMap: state.adjacencyMap,
      edgeNeighbours: state.edgeNeighbours,
      contestProgress: state.contestProgress,
      updateContestProgress: state.updateContestProgress,
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
    handleHackBotCreation,
    handleHackBotDeletion,
    updateVertexPlacementChaosFactor,
    updateVertexNumber,
  } = useVertexState((state) => {
    return {
      vertexNumber: state.vertexNumber,
      vertexPlacementChaosFactor: state.vertexPlacementChaosFactor,
      vertices: state.vertices,
      handleHackBotCreation: state.handleHackBotCreation,
      handleHackBotDeletion: state.handleHackBotDeletion,
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
        .forEach((resource) => {
          resourcesPerSecond[PLAYER.PLAYER_1][resource]
          && updateResource(RESOURCE[resource], PLAYER.PLAYER_1, resourcesPerSecond[PLAYER.PLAYER_1][resource]);
          resourcesPerSecond[PLAYER.PLAYER_2][resource]
          && updateResource(RESOURCE[resource], PLAYER.PLAYER_2, resourcesPerSecond[PLAYER.PLAYER_2][resource]);
        })
    );
    return () => abortController.abort();
  }, [resourcesPerSecond]);

  // Debug
  useControls('Network Model', {
    edge: folder({
      maxLengthPercentage: {
        value: maxEdgeLengthPercentage,
        min: 0,
        max: 1,
        onChange: (value: number) => {
          updateMaxEdgeLengthPercentage(value);
        }
      },
      contestProgress: {
        value: contestProgress,
        min: 0,
        max: 0.5,
        step: 0.01,
        onChange: (value: number) => {
          updateContestProgress(value);
        }
      }
    }),
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
    vertex: folder({
      number: {
        value: vertexNumber,
        min: 0,
        max: 250,
        step: 1,
        onChange: (value: number) => {
          updateVertexNumber(value);
        }
      },
      placementChaosFactor: {
        value: 350,
        min: 0,
        max: 1000,
        onChange: (value: number) => {
          updateVertexPlacementChaosFactor(value);
        }
      }
    }),
  });

  // Rotate Orb on Keypress
  useFrame((state, delta) => {
    const { upward, downward, leftward, rightward } = getKeys();

    const torque = { x: 0, y: 0, z: 0 };
    const torqueStrength = 3000 * delta;

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

  // Toggle Player
  useFrame(() => {
    const { digitOne, digitTwo } = getKeys();

    if (digitOne) {
      updateSelectedPlayer(PLAYER.PLAYER_1);
    }

    if (digitTwo) {
      updateSelectedPlayer(PLAYER.PLAYER_2);
    }
  });

  // Cycle HackBot Blueprint
  useFrame(() => {
    const { cycleLeft, cycleRight } = getKeys();

    if (cycleLeft) {
      updateSelectedHackBotBlueprint(HACK_BOT_CLASS_LIST.GENERATE_HACKING_POWER);
    }

    if (cycleRight) {
      updateSelectedHackBotBlueprint(HACK_BOT_CLASS_LIST.FLOOD_HACK);
    }
  });

  // TODO: Set minDistance/maxDistance dynamically based on network radius size
  return (
    <Suspense fallback={null}>
      <OrbitControls
        enablePan={false}
        enableRotate={false}
        enableZoom={true}
        minDistance={4}
        maxDistance={6}
      />
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
            orbColor={orbColor}
            edgeNeighbours={edgeNeighbours}
            hackBots={hackBots}
            handleHackBotCreation={handleHackBotCreation}
            handleHackBotDeletion={handleHackBotDeletion}
            maxEdgeLengthPercentage={maxEdgeLengthPercentage}
            orbOpacity={orbOpacity}
            orbRadius={orbRadius}
            playerColors={playerColors}
            radius={radius}
            updateOrbColor={updateOrbColor}
            updateOrbOpacity={updateOrbOpacity}
            updateOrbRadius={updateOrbRadius}
            vertices={vertices}
          />
        </RigidBody>
      </Physics>
    </Suspense>
  );
};
