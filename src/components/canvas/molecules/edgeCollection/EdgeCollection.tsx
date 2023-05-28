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
          const fromVector = edgeNeighbours[edgeNeighbour].fromVector;
          const { x: x1, y: y1, z: z1 } = fromVector.vector;
          const toVector = edgeNeighbours[edgeNeighbour].toVector;
          const { x: x2, y: y2, z: z2 } = toVector.vector;

          return (
            <Edge
              key={`Edge: [${x1}, ${y1}, ${z1}], [${x2}, ${y2}, ${z2}]`}
              fromVector={fromVector}
              toVector={toVector}
            />
          );
        })
      }
    </group>
  );
};
