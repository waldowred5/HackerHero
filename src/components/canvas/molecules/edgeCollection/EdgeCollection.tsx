import { Edge } from '../../atoms/edge/Edge';
import { EdgeNeighbours, HackBotVertexMap } from '@/store/relation/types';
import { PLAYER_COLOR } from '@/store/player/types';
import { Vertex, VertexMap } from '@/store/vertex/types';
import useRelationState from '@/store/relation/useRelationState';
import { useEffect } from 'react';

interface Props {
  edgeNeighbours: EdgeNeighbours;
  hackBotVertexMap: HackBotVertexMap;
  playerColors: PLAYER_COLOR;
  useInstancing: boolean;
  vertices: VertexMap;
}

export const EdgeCollection = ({ edgeNeighbours, hackBotVertexMap, playerColors, useInstancing, vertices }: Props) => {
  const { contestProgress } = useRelationState((state) => ({
    contestProgress: state.contestProgress,
  }));

  useEffect(() => {
    console.log('EdgeCollection useEffect triggered');
  }, []);

  return (
    <group>
      {
        Object.keys(edgeNeighbours).map((edgeNeighbour) => {
          if (!vertices[edgeNeighbours[edgeNeighbour].fromVertexId]) {
            return null;
          }

          const fromVertex: Vertex = vertices[edgeNeighbours[edgeNeighbour].fromVertexId];
          const toVertex: Vertex = vertices[edgeNeighbours[edgeNeighbour].toVertexId];

          return (
            <Edge
              key={`Edge: ${fromVertex.uuid}, ${toVertex.uuid}`}
              fromVertex={fromVertex}
              fromVertexOwnershipPercentage={contestProgress}
              hackBotVertexMap={hackBotVertexMap}
              // fromVertexOwnershipPercentage={edgeNeighbours[edgeNeighbour].contest.fromVertex} // TODO: Put this back when contest is working
              toVertex={toVertex}
              toVertexOwnershipPercentage={contestProgress}
              useInstancing={useInstancing}
              // toVertexOwnershipPercentage={edgeNeighbours[edgeNeighbour].contest.toVertex} // TODO: Put this back when contest is working
              playerColors={playerColors}
            />
          );
        })
      }
    </group>
  );
};
