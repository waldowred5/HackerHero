import { create } from 'zustand';
import { RelationState } from '@/store/relation/types';
import { v4 as uuidv4 } from 'uuid';
import { Vertex } from '@/store/vertex/types';
import { PLAYER } from '@/store/player/types';

export default create<RelationState>((set, get) => {
  return {
    adjacencyMap: {},
    edgeNeighbours: {},

    // Actions
    createAdjacencyMap: (
      {
        radius,
        maxEdgeLengthPercentage,
        vertices,
      }
    ) => {
      console.log('Creating Adjacency Map...');
      // For storing edgeIds to apply the same uuid to both edge directions in the edge pair
      const edgeIdsMap: {
        [key: string]: string,
      } = {};

      set(() => {
        const adjacencyMap = vertices.reduce(
          (acc, fromVertex, outerIndex, array) => {
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

        return {
          adjacencyMap,
        };
      });
    },

    createEdgeNeighbours: () => {
      console.log('Generating Edge Neighbours...');

      set((state) => {
        const edgeNeighbours = Object.keys(state.adjacencyMap).reduce(
          (vertexAcc, vertex) => {
            const edges = state.adjacencyMap[vertex].edges.reduce((edgeAcc, edge) => {
              return {
                ...edgeAcc,
                [edge.uuid]: {
                  fromVertex: {
                    vector: edge.fromVertex.vector,
                    uuid: edge.fromVertex.uuid,
                    owner: PLAYER.NEUTRAL,
                    contestProgress: 0,
                  },
                  toVertex: {
                    vector: edge.toVertex.vector,
                    uuid: edge.toVertex.uuid,
                    owner: PLAYER.NEUTRAL,
                    contestProgress: 0,
                  },
                },
              };
            }, {});

            return {
              ...vertexAcc,
              ...edges,
            };
          }, {});

        return {
          edgeNeighbours,
        };
      });
    },

    // TODO: Remove this
    updateEdgeNeighbours: (hackBotId: string) => {
      set((state) => {
        const edges = state.adjacencyMap[hackBotId].edges;
        // const toVertexOwner = state.hackBots.find((hackBot) => hackBot.vertex.uuid === hackBotVertex.uuid);

        const modifiedEdgeNeighbours = edges.reduce((acc, edge) => {
          return {
            ...acc,
            [edge.uuid]: {
              toVertex: edge.toVertex,
              // toVertex: {
              //   ...edge.toVertex,
              //   owner: toVertexOwner
              // },
              fromVertex: {
                ...edge.fromVertex,
                owner: PLAYER.PLAYER_1,
              }
            }
          };

        }, {});

        const edgeNeighbours = {
          ...state.edgeNeighbours,
          ...modifiedEdgeNeighbours,
        };

        return {
          edgeNeighbours,
        };
      });
    },
  };
});
