import { create } from 'zustand';
import * as THREE from 'three';
import { v4 as uuidv4 } from 'uuid';
import {
  HACK_BOT_CLASS,
  HackBot,
  HackBotProps,
  MATCH_PHASE,
  NetworkState,
  PLAYER,
  RESOURCE,
  Vertex
} from './types';

export default create<NetworkState>((set, get) => {
  return {
    // VALUES

    // General
    radius: 2,
    vertexNumber: 14,
    vertexPlacementChaosFactor: 350,

    // Edges (NETCONs)
    adjacencyMap: {},
    edgeNeighbours: {},
    maxEdgeLengthPercentage: 1.0,

    // Vertices (HAKVEKs)
    vertices: [],

    // Orb
    orbOpacity: 0.96,
    orbRadius: 1.6,

    // HackBots
    hackBots: [],

    // Resources
    resources: {
      [RESOURCE.HACKING_POWER]: 275,
      [RESOURCE.COMPUTE_POWER]: 0,
    },

    resourcesPerSecond: {
      [RESOURCE.HACKING_POWER]: 0,
      [RESOURCE.COMPUTE_POWER]: 0,
    },

    // Time
    matchPhase: MATCH_PHASE.PRE_MATCH,
    matchStartTime: 0,
    matchEndTime: 0,

    // ACTIONS

    // HackBot Actions
    createHackBot: ({ vertex: hackBotVertex }: HackBotProps) => {
      // Check if a HackBot already exists on Vertex
      if (get().hackBots.find((existing) => existing.vertex.uuid === hackBotVertex.uuid)) {
        return;
      }

      const newHackBot: HackBot = {
        botClass: HACK_BOT_CLASS.GENERATE_HACKING_POWER,
        resourceCost: 100,
        resourceRequirement: RESOURCE.HACKING_POWER,
        owner: PLAYER.PLAYER_1,
        uuid: uuidv4(),
        vertex: hackBotVertex,
      };

      // Check resource cost
      const canAffordNewHackBot = get().resources[newHackBot.resourceRequirement] >= newHackBot.resourceCost;

      if (!canAffordNewHackBot) {
        // TODO: Play error sound here

        return;
      }

      // Pay resource cost
      set((state) => {
        if (state.resources[newHackBot.resourceRequirement] < newHackBot.resourceCost) {
          return state;
        }

        return {
          resources: {
            ...state.resources,
            [newHackBot.resourceRequirement]: state.resources[newHackBot.resourceRequirement] - newHackBot.resourceCost,
          },
        };
      });

      // Add new HackBot to HackBots
      set((state) => {
        return {
          hackBots: [
            ...state.hackBots,
            newHackBot,
          ],
        };
      });

      // Update resource generation
      set((state) => {
        return {
          resourcesPerSecond: {
            ...state.resourcesPerSecond,
            [RESOURCE.HACKING_POWER]: state.resourcesPerSecond[RESOURCE.HACKING_POWER] + 2,
          },
        };
      });

      // Add new HackBot to Vertex
      set((state) => {
        return {
          vertices: state.vertices.map((vertex) => {
            if (vertex.uuid === hackBotVertex.uuid) {
              return {
                ...vertex,
                hackBot: newHackBot,
                owner: PLAYER.PLAYER_1,
              };
            }

            return vertex;
          }),
        };
      });
    },

    removeHackBot: (uuid: string) => {
      set((state) => {
        return {
          hackBots: state.hackBots.filter((hackBot) => hackBot.uuid !== uuid),
          resourcesPerSecond: {
            ...state.resourcesPerSecond,
            [RESOURCE.HACKING_POWER]: state.resourcesPerSecond[RESOURCE.HACKING_POWER] - 2,
          },
        };
      });
    },

    resetHackBots: () => {
      set({
        hackBots: [],
      });
    },

    // Network Actions
    generateNetwork: () => {
      set((state) => {
        const vertices = state.generateVertices({
          radius: state.radius,
          vertexNumber: state.vertexNumber,
          vertexPlacementChaosFactor: state.vertexPlacementChaosFactor,
        });

        return {
          vertices,
        };
      });

      set((state) => {
        const adjacencyMap = state.generateAdjacencyMap({
          radius: state.radius,
          maxEdgeLengthPercentage: state.maxEdgeLengthPercentage,
          vertices: state.vertices,
        });

        return {
          adjacencyMap,
        };
      });

      set((state) => {
        const edgeNeighbours = state.generateEdgeNeighbours(state.adjacencyMap);

        return {
          edgeNeighbours,
        };
      });

      set(() => {
        return {
          hackBots: [],
        };
      });
    },

    generateAdjacencyMap: (
      {
        radius = 0,
        maxEdgeLengthPercentage = 0,
        vertices = [],
      }
    ) => {
      console.log('Generating Adjacency Map...');
      // For storing edgeIds to apply the same uuid to both edge directions in the edge pair
      const edgeIdsMap = {};

      return vertices.reduce(
        (acc, fromVertex: Vertex, outerIndex, array) => {
          const uuidFrom = array[outerIndex].uuid;

          const edges = array.map((toVertex: Vertex, innerIndex) => {
            // if (outerIndex >= innerIndex) {
            if (outerIndex === innerIndex) {
              return;
            }

            if (
              fromVertex.vector.distanceTo(toVertex.vector) > radius * maxEdgeLengthPercentage
            ) {
              return;
            }

            // Check if an edge uuid has already been generated
            let edgeId = edgeIdsMap[`${fromVertex.uuid}:${toVertex.uuid}`];

            // If no edge uuid set create dual paired keys for the next edgeId search
            if (!edgeId) {
              edgeId = uuidv4();
              edgeIdsMap[`${fromVertex.uuid}:${toVertex.uuid}`] = edgeId;
              edgeIdsMap[`${toVertex.uuid}:${fromVertex.uuid}`] = edgeId;
            }

            return {
              distance: fromVertex.vector.distanceTo(toVertex.vector),
              toVertex,
              fromVertex,
              uuid: edgeId,
            };
          }).filter((edge) => !!edge);

          return {
            ...acc,
            [uuidFrom]: {
              edges,
            },
          };
        }, {});
    },

    generateEdgeNeighbours: (adjacencyMap) => {
      console.log('Generating Edge Neighbours...');

      return Object.keys(adjacencyMap).reduce(
        (vertexAcc, vertex) => {
          const edges = adjacencyMap[vertex].edges.reduce((edgeAcc, edge) => {
            return {
              ...edgeAcc,
              [edge.uuid]: {
                fromVertex: {
                  vector: edge.fromVertex.vector,
                  uuid: edge.fromVertex.uuid,
                },
                toVertex: {
                  vector: edge.toVertex.vector,
                  uuid: edge.toVertex.uuid,
                },
              },
            };
          }, {});

          return {
            ...vertexAcc,
            ...edges,
          };
        }, {}
      );
    },

    updateMaxEdgeLengthPercentage: (newMaxEdgeLengthPercentage: number) => {
      set(() => {
        return {
          maxEdgeLengthPercentage: newMaxEdgeLengthPercentage,
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

    // Vertex Actions
    generateVertices: (
      {
        radius = 2,
        vertexPlacementChaosFactor = 0,
        vertexNumber = 28,
      }
    ) => {
      console.log('Generating Vertex Sphere Vectors...');
      // Re-implementation of fibonacci sphere algorithm
      const offset = 2 / vertexNumber;
      const increment = Math.PI * (3 - Math.sqrt(5));

      return Array.from(Array(vertexNumber)).map((
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
            contestProgress: 0,
          };
        }
      );
    },

    updateVertexNumber: (newVertexNumber: number) => {
      set(() => {
        return {
          vertexNumber: newVertexNumber,
        };
      });
    },

    // Orb Actions
    updateOrbOpacity: (newOpacity: number) => {
      set(() => {
        return {
          orbOpacity: newOpacity,
        };
      });
    },

    updateOrbRadius: (newRadius: number) => {
      set(() => {
        return {
          orbRadius: newRadius,
        };
      });
    },

    // Resource Actions
    updateResource: (resource: RESOURCE, amount: number) => {
      set((state) => {
        return {
          resources: {
            ...state.resources,
            [resource]: state.resources[resource] + amount,
          },
        };
      });
    },

    setResource: (resource: RESOURCE, amount: number) => {
      set((state) => {
        return {
          resources: {
            ...state.resources,
            [resource]: amount,
          },
        };
      });
    },

    // Time Actions
    startMatch: () => {
      set((state) => {
        if (state.matchPhase === MATCH_PHASE.PRE_MATCH) {
          return {
            matchPhase: MATCH_PHASE.ACTIVE_MATCH,
            matchStartTime: Date.now(),
          };
        }

        return {};
      });
    },

    endMatch: () => {
      set((state) => {
        if (state.matchPhase === MATCH_PHASE.ACTIVE_MATCH) {
          return {
            matchPhase: MATCH_PHASE.POST_MATCH,
            matchEndTime: Date.now(),
            resourcesPerSecond: {
              [RESOURCE.HACKING_POWER]: 0,
              [RESOURCE.COMPUTE_POWER]: 0,
            },
          };
        }

        return {};
      });
    },

    resetMatch: () => {
      set((state) => {
        if (state.matchPhase === MATCH_PHASE.ACTIVE_MATCH || state.matchPhase === MATCH_PHASE.POST_MATCH) {
          return {
            matchPhase: MATCH_PHASE.PRE_MATCH,
            resources: {
              [RESOURCE.HACKING_POWER]: 275,
              [RESOURCE.COMPUTE_POWER]: 0,
            },
            resourcesPerSecond: {
              [RESOURCE.HACKING_POWER]: 0,
              [RESOURCE.COMPUTE_POWER]: 0,
            },
          };
        }

        return {};
      });
    },
  };
});
