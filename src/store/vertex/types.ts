import * as THREE from 'three';
import { PLAYER } from '@/store/player/types';

export type Vertex = {
  vector: THREE.Vector3,
  // hackBotId: string | null,
  // owner: keyof typeof PLAYER,
  uuid: string,
}

export interface VertexMap {
  [key: string]: Vertex,
}

interface GenerateVerticesProps {
  radius: number,
  vertexPlacementChaosFactor: number,
  vertexNumber: number,
}

export interface VertexState {
  vertexNumber: number,
  vertexPlacementChaosFactor: number,
  vertices: VertexMap,

  // Actions
  createVertices: (
    {
      radius,
      vertexPlacementChaosFactor,
      vertexNumber,
    }: GenerateVerticesProps
  ) => void,
  handleHackBotCreation: (vertexId: string) => void,
  handleHackBotDeletion: (vertexId: string) => void,
  updateVertexNumber: (newVertexNumber: number) => void,
  // updateVertexOwner: (vertexId: string, newVertexOwner: keyof typeof PLAYER) => void,
  updateVertexPlacementChaosFactor: (newVertexPlacementChaosFactor: number) => void,
}
