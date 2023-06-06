import styled from 'styled-components';

export const VictoryProgressPanelWrapper = styled.div`
  display: flex;
  margin: 36px;
  width: 30vw;
  height: 14px;
  background-color: grey;
  justify-content: space-between;
`;

type VictoryProgressProps = {
  progress: number,
}

export const PlayerVictoryProgress = styled.div`
  display: flex;
  width: ${({ progress }: VictoryProgressProps) => progress}%;
  background-color: blue;
`;

export const OpponentVictoryProgress = styled.div`
  display: flex;
  width: ${({ progress }: VictoryProgressProps) => progress}%;
  background-color: red;
`;
