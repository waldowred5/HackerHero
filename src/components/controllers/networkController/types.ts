import * as THREE from 'three';

export type AdjacencyEdge = {
  distance: number,
  fromVertex: Vertex,
  toVertex: Vertex,
  uuid: string,
  highlight: boolean,
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

export interface HackBotProps {
  vertex: Vertex,
}

export interface GenerateAdjacencyMapProps {
  radius: number,
  maxEdgeLengthPercentage: number,
  vertices: Vertex[],
}

export interface GenerateVerticesProps {
  radius: number,
  vertexPlacementChaosFactor: number,
  vertexNumber: number,
}

export enum PLAYER {
  NEUTRAL = 'NEUTRAL',
  PLAYER_1 = 'PLAYER_1',
  PLAYER_2 = 'PLAYER_2',
}

// TODO: Come up with more creative names for these
export enum HACK_BOT_CLASS {
  GENERATE_HACKING_POWER = 'GENERATE_HACKING_POWER',
  GENERATE_COMPUTE_POWER = 'GENERATE_COMPUTE_POWER',
  FLOOD_HACK = 'FLOOD_HACK',
  DRAIN = 'DRAIN',
  FIREWALL = 'FIREWALL',
  SENTRY = 'SENTRY',
  VIRUS = 'VIRUS',
  ANTIVIRUS = 'ANTIVIRUS',
  DDOS = 'DDOS',
}

export enum RESOURCE {
  HACKING_POWER = 'HACKING_POWER',
  COMPUTE_POWER = 'COMPUTE_POWER',
}

export enum MATCH_PHASE {
  PRE_MATCH = 'PRE_MATCH',
  ACTIVE_MATCH = 'ACTIVE_MATCH',
  POST_MATCH = 'POST_MATCH',
}

export type HackBot = {
  botClass: keyof typeof HACK_BOT_CLASS,
  resourceCost: number,
  resourceRequirement: keyof typeof RESOURCE,
  owner: keyof typeof PLAYER,
  uuid: string,
  vertex: Vertex,
}

export type Vertex = {
  vector: THREE.Vector3,
  uuid: string,
  hackBot?: HackBot,
  owner: keyof typeof PLAYER,
}

export interface NetworkState {
  // General
  radius: number,
  vertexNumber: number,
  vertexPlacementChaosFactor: number,

  // Edges (NETCONs)
  adjacencyMap: AdjacencyMap,
  edgeNeighbours: EdgeNeighbours,
  maxEdgeLengthPercentage: number,

  // Vertices (HAKVEKs)
  vertices: Vertex[],

  // Orb
  orbOpacity: number,
  orbRadius: number,

  // HackBots
  hackBots: HackBot[],

  // Resources
  resources: {
    [key: string]: number,
    [key: string]: number,
  }

  resourcesPerSecond: {
    [key: string]: number,
    [key: string]: number,
  }

  // Time
  matchPhase: keyof typeof MATCH_PHASE,
  matchStartTime: number,
  matchEndTime: number,

  // HackBot Actions
  createHackBot: (
    {
      vertex,
    }: HackBotProps
  ) => void,
  resetHackBots: () => void,
  removeHackBot: (uuid: string) => void,

  // Network Actions
  generateNetwork: () => void,
  generateAdjacencyMap: (
    {
      radius,
      maxEdgeLengthPercentage,
      vertices,
    }: GenerateAdjacencyMapProps
  ) => AdjacencyMap,
  generateEdgeNeighbours: (adjacencyMap: AdjacencyMap) => EdgeNeighbours,
  generateVertices: (
    {
      radius,
      vertexPlacementChaosFactor,
      vertexNumber,
    }: GenerateVerticesProps
  ) => Vertex[],
  updateVertexPlacementChaosFactor: (newVertexPlacementChaosFactor: number) => void,
  updateOrbRadius: (newRadius: number) => void,
  updateOrbOpacity: (newOpacity: number) => void,
  updateMaxEdgeLengthPercentage: (newMaxEdgeLengthPercentage: number) => void,

  // Vertex Actions
  updateVertexNumber: (newVertexNumber: number) => void,

  // Resource Actions
  updateResource: (resource: RESOURCE, amount: number) => void,
  setResource: (resource: RESOURCE, amount: number) => void,

  // Time Actions
  startMatch: () => void,
  endMatch: () => void,
  resetMatch: () => void,
}
