import { NetworkOrb } from '../../atoms/networkOrb/NetworkOrb';
import { EdgeCollection } from '../../molecules/edgeCollection/EdgeCollection';
import { VertexCollection } from '../../molecules/vertexCollection/VertexCollection';
import { HackBotCollection } from '../../molecules/hackBotCollection/HackBotCollection';
import { EdgeNeighbours } from '@/store/relation/types';
import { PLAYER_COLOR } from '@/store/player/types';
import { HackBot, HackBotProps } from '@/store/hackBot/types';
import { Vertex } from '@/store/vertex/types';

interface Props {
  edgeNeighbours: EdgeNeighbours,
  playerColors: PLAYER_COLOR,
  hackBots: HackBot[],
  createHackBot: ({ vertex }: HackBotProps) => void,
  deleteHackBot: (uuid: string) => void,
  orbOpacity: number,
  orbRadius: number,
  updateOrbOpacity: (value: number) => void,
  updateOrbRadius: (value: number) => void,
  vertices: Vertex[],
}

export const NetworkModel = (
  {
    edgeNeighbours,
    playerColors,
    hackBots,
    createHackBot,
    deleteHackBot,
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
        deleteHackBot={deleteHackBot}
        vertices={vertices}
      />

      <EdgeCollection
        edgeNeighbours={edgeNeighbours}
        playerColors={playerColors}
      />

      <HackBotCollection
        hackBots={hackBots}
      />
    </>
  );
};
