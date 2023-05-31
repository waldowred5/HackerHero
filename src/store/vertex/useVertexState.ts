import { create } from 'zustand';
import * as THREE from 'three';
import { v4 as uuidv4 } from 'uuid';
import { VertexState } from './types';
import { PLAYER } from '@/store/player/types';
import { HackBot } from '@/store/hackBot/types';

export default create<VertexState>((set, get) => {
  return {
    vertexNumber: 14,
    vertexPlacementChaosFactor: 350,
    vertices: [],

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

        const vertices = Array.from(Array(vertexNumber)).map((
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

            return {
              vector: new THREE.Vector3(x, y, z),
              uuid: uuidv4(),
              owner: PLAYER.NEUTRAL,
            };
          }
        );

        return {
          vertices,
        };
      });
    },

    // TODO: Remove this
    updateVertices: (hackBotId: string, hackBot: HackBot) => {
      set((state) => {
        const vertices = state.vertices.map((vertex) => {
          if (vertex.uuid === hackBotId) {
            return {
              ...vertex,
              hackBot,
              owner: PLAYER.PLAYER_1,
            };
          }

          return vertex;
        });

        return {
          vertices,
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

    updateVertexNumber: (newVertexNumber: number) => {
      set(() => {
        return {
          vertexNumber: newVertexNumber,
        };
      });
    },
  };
});
