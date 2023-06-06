import { create } from 'zustand';
import * as THREE from 'three';
import { v4 as uuidv4 } from 'uuid';
import { VertexMap, VertexState } from './types';
import { PLAYER } from '@/store/player/types';
import useHackBotState from '@/store/hackBot/useHackBotState';
import { RESOURCE } from '@/store/resource/types';
import useResourceState from '@/store/resource/useResourceState';
import usePlayerState from '@/store/player/usePlayerState';

export default create<VertexState>((set, get) => {
  return {
    vertexNumber: 60,
    vertexPlacementChaosFactor: 350,
    vertices: {},

    // Actions
    createVertices: (
      {
        radius,
        vertexPlacementChaosFactor,
        vertexNumber,
      }
    ) => {
      console.log('Generating Vertex Sphere Vectors...');
      // Re-implementation of fibonacci lattice algorithm

      set(() => {
        const offset = 2 / vertexNumber;
        const increment = Math.PI * (3 - Math.sqrt(5));

        const vertices: VertexMap = Array.from(Array(vertexNumber)).reduce((
            acc: VertexMap,
            sample,
            index
          ) => {
            const chaosLevel = 1 + Math.random() *
              vertexPlacementChaosFactor / vertexNumber / 1000;
            const yMod = ((index * offset) - 1) + (offset / 2);
            const distance = Math.sqrt(1 - Math.pow(yMod, 2));
            const phi = ((index + 1) % vertexNumber) * increment * chaosLevel;
            const zMod = Math.sin(phi) * distance;
            const xMod = Math.cos(phi) * distance;
            const x = xMod * radius;
            const y = yMod * radius;
            const z = zMod * radius;

            const uuid = uuidv4();

            return {
              ...acc,
              [uuid]: {
                vector: new THREE.Vector3(x, y, z),
                owner: PLAYER.NEUTRAL,
                uuid,
              },
            };
          }, {}
        );

        return {
          vertices,
        };
      });
    },

    handleHackBotCreation: (vertexId: string) => {
      if (get().vertices[vertexId].hackBotId) {
        console.log('A HackBot already exists on this Vertex');

        return;
      }

      // Check resource cost
      const selectedHackBotBlueprint = useHackBotState.getState().hackBotBlueprints[useHackBotState.getState().selectedHackBotBlueprint];
      const canAffordNewHackBot =
        useResourceState.getState().resources[PLAYER[usePlayerState.getState().selectedPlayer]][selectedHackBotBlueprint.resourceRequirement]
        >= selectedHackBotBlueprint.resourceCost;

      if (!canAffordNewHackBot) {
        // TODO: Play error sound here
        console.log('Cannot afford new HackBot');

        return;
      }

      // Pay resource cost
      useResourceState.getState().updateResource(RESOURCE[selectedHackBotBlueprint.resourceRequirement], PLAYER[usePlayerState.getState().selectedPlayer], -selectedHackBotBlueprint.resourceCost);
      // Update resource generation
      useResourceState.getState().updateResourcesPerSecond(RESOURCE[selectedHackBotBlueprint.resourcesPerSecondType], PLAYER[usePlayerState.getState().selectedPlayer], selectedHackBotBlueprint.resourcesPerSecond);

      const newHackBotUuid = uuidv4();
      const selectedPlayer = usePlayerState.getState().selectedPlayer;

      useHackBotState.getState().createHackBot(newHackBotUuid, selectedPlayer);

      set((state) => {
        return {
          vertices: {
            ...state.vertices,
            [vertexId]: {
              ...state.vertices[vertexId],
              hackBotId: newHackBotUuid,
              owner: selectedPlayer,
            },
          },
        };
      });
    },

    handleHackBotDeletion: (vertexId: string) => {
      const hackBotId = get().vertices[vertexId].hackBotId;

      if (!hackBotId) {
        console.log('No HackBot exists on this Vertex');

        return;
      }

      const hackBot = useHackBotState.getState().hackBots[hackBotId];
      const hackBotResourcesPerSecondType = hackBot.resourcesPerSecondType;
      const hackBotResourcesPerSecond = hackBot.resourcesPerSecond;

      useResourceState.getState().updateResourcesPerSecond(RESOURCE[hackBotResourcesPerSecondType], -hackBotResourcesPerSecond);

      useHackBotState.getState().deleteHackBot(hackBotId);

      set((state) => {
        return {
          vertices: {
            ...state.vertices,
            [vertexId]: {
              ...state.vertices[vertexId],
              hackBotId: null,
              owner: PLAYER.NEUTRAL,
            },
          },
        };
      });
    },

    updateVertexNumber: (newVertexNumber: number) => {
      set(() => {
        return {
          vertexNumber: newVertexNumber,
        };
      });
    },

    updateVertexOwner: (vertexId: string, newVertexOwner: keyof typeof PLAYER) => {
      set((state) => {
        return {
          vertices: {
            ...state.vertices,
            [vertexId]: {
              ...state.vertices[vertexId],
              owner: newVertexOwner,
            }
          },
        };
      });
    },

    updateVertexPlacementChaosFactor: (newVertexPlacementChaosFactor: number) => {
      set(() => {
        return {
          vertexPlacementChaosFactor: newVertexPlacementChaosFactor,
        };
      });
    },
  };
});
