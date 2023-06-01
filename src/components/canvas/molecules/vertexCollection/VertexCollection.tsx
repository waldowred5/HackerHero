import { VertexModel } from '../../atoms/vertexModel/VertexModel';
import { VertexMap } from '@/store/vertex/types';
import { PLAYER } from '@/store/player/types';
import { HackBotModel } from '@/components/canvas/atoms/hackBotModel/HackBotModel';

interface Props {
  handleHackBotCreation: (vertexId: string, player: PLAYER) => void,
  handleHackBotDeletion: (vertexId: string) => void,
  vertices: VertexMap;
}

export const VertexCollection = ({ handleHackBotCreation, handleHackBotDeletion, vertices }: Props) => {
  return (
    <>
      {
        Object.entries(vertices).map((vertex, i) => {
          return (
            <>
              <VertexModel
                key={`Vertex: ${vertex[1].uuid}`}
                handleHackBotCreation={handleHackBotCreation}
                handleHackBotDeletion={handleHackBotDeletion}
                vertex={vertex[1]}
                uuid={vertex[0]}
              />
              {
                 vertex[1].hackBotId && <HackBotModel
                  key={`HackBot: ${vertex[1].hackBotId}`}
                  vector={vertex[1].vector}
                />
              }
            </>
          );
        })
      }
    </>
  );
};
