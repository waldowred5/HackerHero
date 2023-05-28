import React from 'react';
import { EdgeNeighbours } from '../../../controllers/networkController/types';
import { Edge } from '../../atoms/edge/Edge';

interface Props {
  edgeNeighbours: EdgeNeighbours;
}

export const EdgeCollection = ({ edgeNeighbours }: Props) => {
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
            />
          );
        })
      }
    </group>
  );
};
