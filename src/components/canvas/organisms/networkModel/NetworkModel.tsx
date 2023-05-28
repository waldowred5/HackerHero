import React from 'react';
import { NetworkOrb } from '../../atoms/networkOrb/NetworkOrb';
import {
  AdjacencyMap,
  EdgeNeighbours,
  HackBot,
  HackBotProps,
  Vertex
} from '../../../controllers/networkController/types';
import { EdgeCollection } from '../../molecules/edgeCollection/EdgeCollection';
import { VertexCollection } from '../../molecules/vertexCollection/VertexCollection';
import { HackBotCollection } from '../../molecules/hackBotCollection/HackBotCollection';

interface Props {
  edgeNeighbours: EdgeNeighbours,
  hackBots: HackBot[],
  createHackBot: ({ vertex }: HackBotProps) => void,
  removeHackBot: (uuid: string) => void,
  orbOpacity: number,
  orbRadius: number,
  updateOrbOpacity: (value: number) => void,
  updateOrbRadius: (value: number) => void,
  vertices: Vertex[],
}

export const NetworkModel = (
  {
    edgeNeighbours,
    hackBots,
    createHackBot,
    removeHackBot,
    orbOpacity,
    updateOrbOpacity,
    orbRadius,
    updateOrbRadius,
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
        edgeNeighbours={edgeNeighbours}
      />

      <HackBotCollection
        hackBots={hackBots}
      />
    </>
  );
};
