import {
  OpponentVictoryProgress,
  PlayerVictoryProgress,
  VictoryProgressPanelWrapper
} from './styles';
import { VertexMap } from '@/store/vertex/types';
import { useEffect, useState } from 'react';
import { PLAYER } from '@/store/player/types';

interface Props {
  vertices: VertexMap;
}

// TODO: Upgrade to include contest progress for finer granularity
export const VictoryProgressPanel = ({ vertices }: Props) => {
  const [playerVictoryProgress, setPlayerVictoryProgress] = useState(0);
  const [opponentVictoryProgress, setOpponentVictoryProgress] = useState(0);

  useEffect(() => {
    let playerVictoryCount = 0;
    let opponentVictoryCount = 0;
    const totalCount = Object.values(vertices).length;

    Object.values(vertices).forEach((vertex) => {
      if (vertex.owner === PLAYER.PLAYER_1) {
        playerVictoryCount++;
      } else if (vertex.owner === PLAYER.PLAYER_2) {
        opponentVictoryCount++;
      }
    });

    setPlayerVictoryProgress((playerVictoryCount / totalCount) * 100);
    setOpponentVictoryProgress((opponentVictoryCount / totalCount) * 100);
  }, [vertices]);

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
