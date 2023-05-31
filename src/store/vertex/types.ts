import * as THREE from 'three';
import { PLAYER } from '@/store/player/types';
import { HackBot } from '@/store/hackBot/types';

export type Vertex = {
  vector: THREE.Vector3,
  uuid: string,
  hackBot?: HackBot,
  owner: keyof typeof PLAYER,
}

interface GenerateVerticesProps {
  radius: number,
  vertexPlacementChaosFactor: number,
  vertexNumber: number,
}

export interface VertexState {
  vertexNumber: number,
  vertexPlacementChaosFactor: number,
  vertices: Vertex[],

  // Actions
  createVertices: (
    {
      radius,
      vertexPlacementChaosFactor,
      vertexNumber,
    }: GenerateVerticesProps
  ) => void,
  
  // TODO: Remove this
  updateVertices: (hackBotId: string, hackBot: HackBot) => void,
  
  updateVertexPlacementChaosFactor: (newVertexPlacementChaosFactor: number) => void,
  updateVertexNumber: (newVertexNumber: number) => void,
}
