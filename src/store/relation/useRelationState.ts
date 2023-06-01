import { create } from 'zustand';
import { RelationState } from '@/store/relation/types';
import { v4 as uuidv4 } from 'uuid';

export default create<RelationState>((set) => {
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
        const adjacencyMap = Object.entries(vertices).reduce(
          (acc, fromVertex, outerIndex, array) => {
            const uuidFrom = array[outerIndex][1].uuid;

            const edges = array.map((toVertex, innerIndex) => {
              // if (outerIndex >= innerIndex) {
              if (outerIndex === innerIndex) {
                return;
              }

              if (
                fromVertex[1].vector.distanceTo(toVertex[1].vector) > radius * maxEdgeLengthPercentage
              ) {
                return;
              }

              // Check if an edge uuid has already been generated
              let edgeId = edgeIdsMap[`${fromVertex[1].uuid}:${toVertex[1].uuid}`];

              // If no edge uuid is set, create dual paired keys for the next edgeId search
              if (!edgeId) {
                edgeId = uuidv4();
                edgeIdsMap[`${fromVertex[1].uuid}:${toVertex[1].uuid}`] = edgeId;
                edgeIdsMap[`${toVertex[1].uuid}:${fromVertex[1].uuid}`] = edgeId;
              }

              return {
                distance: fromVertex[1].vector.distanceTo(toVertex[1].vector),
                fromVertexId: fromVertex[1].uuid,
                toVertexId: toVertex[1].uuid,
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
                  contest: {
                    fromVertex: 0.3,
                    toVertex: 0.3,
                  },
                  distance: edge.distance,
                  fromVertexId: edge.fromVertexId,
                  toVertexId: edge.toVertexId,
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
  };
});
