import React from 'react';
import { VertexModel } from '../../atoms/vertexModel/VertexModel';
import { HackBotProps, Vertex } from '../../../controllers/networkController/types';

interface Props {
  createHackBot: ({ vertex }: HackBotProps) => void,
  removeHackBot: (uuid: string) => void,
  vertices: Vertex[],
}

export const VertexCollection = ({ createHackBot, removeHackBot, vertices }: Props) => {
  return (
    <>
       {
         vertices.map((vertex, i) => {
           return (
             <VertexModel
               key={`Vertex ${i}: ${vertex.vector}`}
               createHackBot={createHackBot}
               removeHackBot={removeHackBot}
               vertex={vertex}
               uuid={vertex.uuid}
             />
           );
         })
      }
    </>
  );
};
