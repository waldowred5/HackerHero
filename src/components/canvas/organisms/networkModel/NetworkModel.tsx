import { NetworkOrb } from '../../atoms/networkOrb/NetworkOrb';
import { EdgeCollection } from '../../molecules/edgeCollection/EdgeCollection';
import { VertexCollection } from '../../molecules/vertexCollection/VertexCollection';
import { EdgeNeighbours } from '@/store/relation/types';
import { PLAYER, PLAYER_COLOR } from '@/store/player/types';
import { HackBotMap } from '@/store/hackBot/types';
import { VertexMap } from '@/store/vertex/types';

interface Props {
  edgeNeighbours: EdgeNeighbours,
  playerColors: PLAYER_COLOR,
  hackBots: HackBotMap,
  handleHackBotCreation: (vertexId: string, player: PLAYER) => void,
  handleHackBotDeletion: (vertexId: string) => void,
  orbOpacity: number,
  orbRadius: number,
  updateOrbOpacity: (value: number) => void,
  updateOrbRadius: (value: number) => void,
  vertices: VertexMap,
}

export const NetworkModel = (
  {
    edgeNeighbours,
    playerColors,
    hackBots,
    handleHackBotCreation,
    handleHackBotDeletion,
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
        handleHackBotCreation={handleHackBotCreation}
        handleHackBotDeletion={handleHackBotDeletion}
        hackBots={hackBots}
        vertices={vertices}
      />

      <EdgeCollection
        edgeNeighbours={edgeNeighbours}
        playerColors={playerColors}
        vertices={vertices}
      />
    </>
  );
};
