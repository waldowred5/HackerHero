import { Vertex } from '@/store/vertex/types';

export type AdjacencyEdge = {
  distance: number,
  fromVertex: Vertex,
  toVertex: Vertex,
  uuid: string,
}

export type AdjacencyMap = {
  [key: string]: {
    edges: AdjacencyEdge[],
  }
}

export type EdgeNeighbours = {
  [key: string]: {
    fromVertex: Vertex,
    toVertex: Vertex,
  },
}

export interface GenerateAdjacencyMapProps {
  radius: number,
  maxEdgeLengthPercentage: number,
  vertices: Vertex[],
}

export interface RelationState {
  adjacencyMap: AdjacencyMap,
  edgeNeighbours: EdgeNeighbours,

  // Actions
  createAdjacencyMap: (
    {
      radius,
      maxEdgeLengthPercentage,
      vertices,
    }: GenerateAdjacencyMapProps
  ) => void,
  createEdgeNeighbours: () => void,

  // TODO: Remove this
  updateEdgeNeighbours: (hackBotId: string) => void,
}
