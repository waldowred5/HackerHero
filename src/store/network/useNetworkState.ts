import { create } from 'zustand';
import { NetworkState } from '@/store/network/types';
import useVertexState from '@/store/vertex/useVertexState';
import useRelationState from '@/store/relation/useRelationState';
import useEdgeState from '@/store/edge/useEdgeState';
import useHackBotState from '@/store/hackBot/useHackBotState';

export default create<NetworkState>((set, get) => {
  return {
    orbOpacity: 0.96,
    orbRadius: 1.6,
    radius: 2,

    // Actions
    createNetwork: () => {
      useVertexState.getState().createVertices({
        radius: get().radius,
        vertexNumber: useVertexState.getState().vertexNumber,
        vertexPlacementChaosFactor: useVertexState.getState().vertexPlacementChaosFactor,
      });

      useRelationState.getState().createAdjacencyMap({
        radius: get().radius,
        maxEdgeLengthPercentage: useEdgeState.getState().maxEdgeLengthPercentage,
        vertices: useVertexState.getState().vertices,
      });

      useRelationState.getState().createEdgeNeighbours();

      useHackBotState.getState().resetHackBots();
    },

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
  };
});
