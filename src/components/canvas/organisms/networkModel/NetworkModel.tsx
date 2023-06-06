import { Suspense, useEffect } from 'react';
import { NetworkOrb } from '../../atoms/networkOrb/NetworkOrb';
import { EdgeCollection } from '../../molecules/edgeCollection/EdgeCollection';
import { VertexCollection } from '../../molecules/vertexCollection/VertexCollection';
import { EdgeNeighbours } from '@/store/relation/types';
import { PLAYER_COLOR } from '@/store/player/types';
import { HackBotMap } from '@/store/hackBot/types';
import { VertexMap } from '@/store/vertex/types';

interface Props {
  orbColor: {
    red: number,
    green: number,
    blue: number,
  }
  edgeNeighbours: EdgeNeighbours,
  playerColors: PLAYER_COLOR,
  hackBots: HackBotMap,
  handleHackBotCreation: (vertexId: string) => void,
  handleHackBotDeletion: (vertexId: string) => void,
  orbOpacity: number,
  orbRadius: number,
  updateOrbColor: (channel: string, newColor: number) => void,
  updateOrbOpacity: (value: number) => void,
  updateOrbRadius: (value: number) => void,
  vertices: VertexMap,
}

export const NetworkModel = (
  {
    orbColor,
    edgeNeighbours,
    playerColors,
    hackBots,
    handleHackBotCreation,
    handleHackBotDeletion,
    orbOpacity,
    updateOrbOpacity,
    orbRadius,
    updateOrbColor,
    updateOrbRadius,
    vertices,
  }: Props) => {
  useEffect(() => {
    console.log({ edgeNeighbours, playerColors, vertices });
  }, []);

  return (
    <>
      <NetworkOrb
        orbColor={orbColor}
        orbOpacity={orbOpacity}
        orbRadius={orbRadius}
        updateOrbColor={updateOrbColor}
        updateOrbOpacity={updateOrbOpacity}
        updateOrbRadius={updateOrbRadius}
      />

      <VertexCollection
        hackBots={hackBots}
        handleHackBotCreation={handleHackBotCreation}
        handleHackBotDeletion={handleHackBotDeletion}
        playerColors={playerColors}
        vertices={vertices}
      />

      <Suspense fallback={null}>
        <EdgeCollection
          edgeNeighbours={edgeNeighbours}
          playerColors={playerColors}
          vertices={vertices}
        />
      </Suspense>
    </>
  );
};
