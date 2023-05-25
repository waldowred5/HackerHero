import React from 'react';
import { AdjacencyEdge, AdjacencyMap, Vertex } from '../../../controllers/networkController/types';
import { Edge } from '../../atoms/edge/Edge';

interface Props {
  adjacencyMap: AdjacencyMap;
  maxEdgeLengthPercentage: number;
  radius: number;
  vertices: Vertex[];
}

export const EdgeCollection = ({ adjacencyMap }: Props) => {
  return (
    <group>
      {
        Object.keys(adjacencyMap).map((vertexUuid) => {
          return adjacencyMap[vertexUuid].edges.map((edge: AdjacencyEdge) => {
            const { fromVector, toVector, highlight } = edge;
            const { x: x1, y: y1, z: z1 } = edge.fromVector.vector;
            const { x: x2, y: y2, z: z2 } = edge.toVector.vector;

            return (
              <Edge
                key={`Edge: [${x1}, ${y1}, ${z1}], [${x2}, ${y2}, ${z2}]`}
                fromVector={fromVector}
                toVector={toVector}
                highlight={highlight}
              />
            );
          });
        })
      }
    </group>
  );
};
