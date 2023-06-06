import { VertexModel } from '../../atoms/vertexModel/VertexModel';
import { VertexMap } from '@/store/vertex/types';
import { HackBotModel } from '@/components/canvas/atoms/hackBotModel/HackBotModel';
import { PLAYER_COLOR } from '@/store/player/types';
import { HackBotMap } from '@/store/hackBot/types';

interface Props {
  hackBots: HackBotMap,
  handleHackBotCreation: (vertexId: string) => void,
  handleHackBotDeletion: (vertexId: string) => void,
  playerColors: PLAYER_COLOR,
  vertices: VertexMap;
}

export const VertexCollection = (
  {
    hackBots,
    handleHackBotCreation,
    handleHackBotDeletion,
    playerColors,
    vertices
  }: Props) => {
  return (
    <>
      {
        Object.entries(vertices).map((vertex) => {
          return (
            <group
              key={`Vertex: ${vertex[0]}`}
            >
              <VertexModel
                handleHackBotCreation={handleHackBotCreation}
                handleHackBotDeletion={handleHackBotDeletion}
                playerColors={playerColors}
                vertex={vertex[1]}
                uuid={vertex[0]}
              />
              {
                vertex[1].hackBotId && <HackBotModel
                  key={`HackBot: ${vertex[1].hackBotId}`}
                  owner={vertex[1].owner}
                  playerColors={playerColors}
                  hackBotClass={hackBots[vertex[1].hackBotId].botClass}
                  vector={vertex[1].vector}
                />
              }
            </group>
          );
        })
      }
    </>
  );
};
