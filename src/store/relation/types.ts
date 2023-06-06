import { VertexMap } from '@/store/vertex/types';

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

export interface GenerateAdjacencyMapProps {
  radius: number,
  maxEdgeLengthPercentage: number,
  vertices: VertexMap,
}

export interface RelationState {
  adjacencyMap: AdjacencyMap,
  edgeNeighbours: EdgeNeighbours,

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
}
