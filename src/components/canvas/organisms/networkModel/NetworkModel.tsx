import React from 'react';
import { NetworkOrb } from '../../atoms/networkOrb/NetworkOrb';
import {
  AdjacencyMap,
  HackBot,
  HackBotProps,
  Vertex
} from '../../../controllers/networkController/types';
import { EdgeCollection } from '../../molecules/edgeCollection/EdgeCollection';
import { VertexCollection } from '../../molecules/vertexCollection/VertexCollection';
import { HackBotCollection } from '../../molecules/hackBotCollection/HackBotCollection';

interface Props {
  adjacencyMap: AdjacencyMap,
  hackBots: HackBot[],
  createHackBot: ({ vertex }: HackBotProps) => void,
  removeHackBot: (uuid: string) => void,
  maxEdgeLengthPercentage: number,
  orbOpacity: number,
  orbRadius: number,
  radius: number,
  updateOrbOpacity: (value: number) => void,
  updateOrbRadius: (value: number) => void,
  vertices: Vertex[],
}

export const NetworkModel = (
  {
    adjacencyMap,
    hackBots,
    createHackBot,
    removeHackBot,
    maxEdgeLengthPercentage,
    orbOpacity,
    updateOrbOpacity,
    orbRadius,
    updateOrbRadius,
    radius,
    vertices,
  }: Props) => {
  return (
    <>
      <NetworkOrb
        orbOpacity={orbOpacity}
        updateOrbOpacity={updateOrbOpacity}
        orbRadius={orbRadius}
        updateOrbRadius={updateOrbRadius}
      />

      <VertexCollection
        createHackBot={createHackBot}
        removeHackBot={removeHackBot}
        vertices={vertices}
      />

      <EdgeCollection
        adjacencyMap={adjacencyMap}
        maxEdgeLengthPercentage={maxEdgeLengthPercentage}
        radius={radius}
        vertices={vertices}
      />

      <HackBotCollection
        hackBots={hackBots}
        vertices={vertices}
      />
    </>
  );
};
