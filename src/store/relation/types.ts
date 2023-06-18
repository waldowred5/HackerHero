import { VertexMap } from '@/store/vertex/types';
import { PLAYER } from '@/store/player/types';

export type AdjacencyEdge = {
  distance: number,
  fromVertexId: string,
  toVertexId: string,
  uuid: string,
}

export type AdjacencyMap = {
  [key: string]: {
    edges: AdjacencyEdge[],
  }
}

export type EdgeNeighbours = {
  [key: string]: {
    contest: {
      fromVertex: number,
      toVertex: number,
    },
    distance: number,
    fromVertexId: string,
    toVertexId: string,
  },
}

export type HackBotVertexMap = {
  [key: string]: {
    hackBotId: string | null,
    owner: keyof typeof PLAYER,
  }
}

export interface GenerateAdjacencyMapProps {
  radius: number,
  maxEdgeLengthPercentage: number,
  vertices: VertexMap,
}

export interface RelationState {
  adjacencyMap: AdjacencyMap,
  edgeNeighbours: EdgeNeighbours,
  hackBotVertexMap: HackBotVertexMap,

  // Debug
  contestProgress: number,
  updateContestProgress: (newProgress: number) => void,

    // Actions
  createAdjacencyMap: (
    {
      radius,
      maxEdgeLengthPercentage,
      vertices,
    }: GenerateAdjacencyMapProps
  ) => void,
  createEdgeNeighbours: () => void,
  createHackBotVertexMap: () => void,
  updateHackBotVertexMap: (vertexId: string, hackBotId: string | null, owner: keyof typeof PLAYER) => void,
}
