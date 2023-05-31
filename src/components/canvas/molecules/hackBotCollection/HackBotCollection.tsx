import { HackBotModel } from '../../atoms/hackBotModel/HackBotModel';
import { HackBot } from '@/store/hackBot/types';

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
