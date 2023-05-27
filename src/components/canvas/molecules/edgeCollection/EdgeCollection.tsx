import React from 'react';
import { AdjacencyEdge, AdjacencyMap, EdgeNeighbours, Vertex } from '../../../controllers/networkController/types';
import { Edge } from '../../atoms/edge/Edge';
import * as THREE from 'three';

interface Props {
  adjacencyMap: AdjacencyMap;
  edgeNeighbours: EdgeNeighbours;
  maxEdgeLengthPercentage: number;
  radius: number;
  vertices: Vertex[];
}

export const EdgeCollection = ({ adjacencyMap, edgeNeighbours }: Props) => {
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
    // <group>
    //   {
    //     Object.keys(edgeNeighbours).map((edgeNeighbour) => {
    //       const fromVector: THREE.Vector3 = edgeNeighbours[edgeNeighbour].fromVector.vector;
    //       const { x: x1, y: y1, z: z1 } = fromVector;
    //       const toVector: THREE.Vector3 = edgeNeighbours[edgeNeighbour].toVector.vector;
    //       const { x: x2, y: y2, z: z2 } = toVector;
    //
    //         return (
    //           <Edge
    //             key={`Edge: [${x1}, ${y1}, ${z1}], [${x2}, ${y2}, ${z2}]`}
    //             fromVector={fromVector}
    //             toVector={toVector}
    //             // highlight={highlight}
    //           />
    //         );
    //       // });
    //     })
    //   }
    // </group>
  );
};
