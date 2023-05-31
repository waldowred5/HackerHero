import { VertexModel } from '../../atoms/vertexModel/VertexModel';
import { HackBotProps } from '@/store/hackBot/types';
import { Vertex } from '@/store/vertex/types';

interface Props {
  createHackBot: ({ vertex }: HackBotProps) => void,
  deleteHackBot: (uuid: string) => void,
  vertices: Vertex[],
}

export const VertexCollection = ({ createHackBot, deleteHackBot, vertices }: Props) => {
  return (
    <>
       {
         vertices.map((vertex, i) => {
           return (
             <VertexModel
               key={`Vertex ${i}: ${vertex.vector.x}`}
               createHackBot={createHackBot}
               deleteHackBot={deleteHackBot}
               vertex={vertex}
               uuid={vertex.uuid}
             />
           );
         })
      }
    </>
  );
};
