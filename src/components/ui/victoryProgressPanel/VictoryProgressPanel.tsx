import {
  OpponentVictoryProgress,
  PlayerVictoryProgress,
  VictoryProgressPanelWrapper
} from './styles';
import { VertexMap } from '@/store/vertex/types';
import { useEffect, useState } from 'react';
import { PLAYER } from '@/store/player/types';
import { HackBotVertexMap } from '@/store/relation/types';

interface Props {
  hackBotVertexMap: HackBotVertexMap;
}

// TODO: Upgrade to include contest progress for finer granularity
export const VictoryProgressPanel = ({ hackBotVertexMap }: Props) => {
  const [playerVictoryProgress, setPlayerVictoryProgress] = useState(0);
  const [opponentVictoryProgress, setOpponentVictoryProgress] = useState(0);

  useEffect(() => {
    let playerVictoryCount = 0;
    let opponentVictoryCount = 0;
    const totalCount = Object.values(hackBotVertexMap).length;

    Object.values(hackBotVertexMap).forEach((vertex) => {
      if (vertex.owner === PLAYER.PLAYER_1) {
        playerVictoryCount++;
      } else if (vertex.owner === PLAYER.PLAYER_2) {
        opponentVictoryCount++;
      }
    });

    setPlayerVictoryProgress((playerVictoryCount / totalCount) * 100);
    setOpponentVictoryProgress((opponentVictoryCount / totalCount) * 100);
  }, [hackBotVertexMap]);

  return (
    <VictoryProgressPanelWrapper>
      <PlayerVictoryProgress
        progress={playerVictoryProgress}
      />
      <OpponentVictoryProgress
        progress={opponentVictoryProgress}
      />
    </VictoryProgressPanelWrapper>
  );
};
