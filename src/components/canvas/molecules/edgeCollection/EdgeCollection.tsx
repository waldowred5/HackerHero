import React from 'react';
import { EdgeNeighbours, PLAYER_COLOR } from '../../../controllers/networkController/types';
import { Edge } from '../../atoms/edge/Edge';

interface Props {
  edgeNeighbours: EdgeNeighbours;
  playerColors: PLAYER_COLOR;
}

export const EdgeCollection = ({ edgeNeighbours, playerColors }: Props) => {
  return (
    <group>
      {
        Object.keys(edgeNeighbours).map((edgeNeighbour) => {
          const fromVertex = edgeNeighbours[edgeNeighbour].fromVertex;
          const { x: x1, y: y1, z: z1 } = fromVertex.vector;
          const toVertex = edgeNeighbours[edgeNeighbour].toVertex;
          const { x: x2, y: y2, z: z2 } = toVertex.vector;

          return (
            <Edge
              key={`Edge: [${x1}, ${y1}, ${z1}], [${x2}, ${y2}, ${z2}]`}
              fromVertex={fromVertex}
              toVertex={toVertex}
              playerColors={playerColors}
            />
          );
        })
      }
    </group>
  );
};
