import { VertexModel } from '../../atoms/vertexModel/VertexModel';
import { VertexMap } from '@/store/vertex/types';
import { HackBotModel } from '@/components/canvas/atoms/hackBotModel/HackBotModel';
import { PLAYER_COLOR } from '@/store/player/types';
import { HackBotMap } from '@/store/hackBot/types';
import { HackBotVertexMap } from '@/store/relation/types';

interface Props {
  hackBots: HackBotMap,
  hackBotVertexMap: HackBotVertexMap,
  handleHackBotCreation: (vertexId: string) => void,
  handleHackBotDeletion: (vertexId: string) => void,
  playerColors: PLAYER_COLOR,
  vertices: VertexMap;
}

export const VertexCollection = (
  {
    hackBots,
    hackBotVertexMap,
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
                hackBotVertexMap={hackBotVertexMap}
                handleHackBotCreation={handleHackBotCreation}
                handleHackBotDeletion={handleHackBotDeletion}
                playerColors={playerColors}
                vertex={vertex[1]}
                uuid={vertex[0]}
              />
              {
                hackBotVertexMap[vertex[1].uuid].hackBotId && <HackBotModel
                  key={`HackBot: ${hackBotVertexMap[vertex[1].uuid].hackBotId}`}
                  owner={hackBotVertexMap[vertex[1].uuid].owner}
                  playerColors={playerColors}
                  hackBotClass={hackBots[hackBotVertexMap[vertex[1].uuid].hackBotId].botClass}
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
