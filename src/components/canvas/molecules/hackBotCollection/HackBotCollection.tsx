import React from 'react';
import { HackBot, Vertex } from '../../../controllers/networkController/types';
import { HackBotModel } from '../../atoms/hackBotModel/HackBotModel';

interface Props {
  hackBots: HackBot[];
}

export const HackBotCollection = ({ hackBots }: Props) => {
  return (
    <group>
      {
        hackBots.map((hackBot) => {
          return (
            <HackBotModel
              key={`HackBot: ${hackBot.uuid}`}
              vector={hackBot.vertex.vector}
            />
          );
        })
      }
    </group>
  );
};
