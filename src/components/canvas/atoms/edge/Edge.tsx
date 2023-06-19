import { Vertex } from '@/store/vertex/types';
import { PLAYER, PLAYER_COLOR } from '@/store/player/types';
import { HackBotVertexMap } from '@/store/relation/types';
import { Vector3 } from 'three';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import { fragmentShader, vertexShader } from '@/components/canvas/atoms/edge/shaders';

const getColor = (player: PLAYER, playerColors) => {
  // TODO: Object key access
  // TODO: Clean this up
  return new Vector3(
    playerColors[player]['edge'][0],
    playerColors[player]['edge'][1],
    playerColors[player]['edge'][2],
  );
};

const CustomShader = shaderMaterial(
  {
    uCylinderColorBase: null,
    uCylinderColorFromVertex: null,
    uCylinderColorToVertex: null,
    uCylinderDistance: 0.0,
    uFromVertexOwnershipPercentage: 0.4,
    uToVertexOwnershipPercentage: 0.4,
  },
  vertexShader,
  fragmentShader,
);

extend({ CustomShader });

interface Props {
  fromVertex: Vertex;
  fromVertexOwnershipPercentage: number;
  hackBotVertexMap: HackBotVertexMap;
  toVertex: Vertex;
  toVertexOwnershipPercentage: number;
  playerColors: PLAYER_COLOR;
}

export const Edge = (
  {
    fromVertex,
    fromVertexOwnershipPercentage,
    hackBotVertexMap,
    toVertex,
    toVertexOwnershipPercentage,
    playerColors,
  }: Props) => {
  useEffect(() => {
    console.log('Edge useEffect triggered');
  }, []);

  const meshRef = useRef();
  const geomRef = useRef();

  const cylinderRadius = 0.01;
  const cylinderTesselation = {
    radial: 16,
    length: 32,
  };

  const [distance, setDistance] = useState(0.0);

  useLayoutEffect(() => {
    const newDistance = fromVertex.vector.distanceTo(toVertex.vector);
    setDistance(newDistance);
    geomRef.current.translate(0, distance / 2, 0);
    geomRef.current.rotateX(Math.PI / 2);
  }, [geomRef, toVertex, fromVertex, distance]);

  useLayoutEffect(() => {
    meshRef.current.position.copy(toVertex.vector);
    meshRef.current.lookAt(fromVertex.vector);
  }, [meshRef, toVertex, fromVertex]);

  return (
    <>
      <mesh
        ref={meshRef}
      >
        <cylinderGeometry
          ref={geomRef}
          args={[cylinderRadius, cylinderRadius, distance, cylinderTesselation.radial, cylinderTesselation.length]}
        />
        <customShader
          key={CustomShader.key}
          uCylinderColorBase={getColor(PLAYER.NEUTRAL, playerColors)}
          uCylinderColorFromVertex={getColor(PLAYER[hackBotVertexMap[fromVertex.uuid].owner], playerColors)}
          uCylinderColorToVertex={getColor(PLAYER[hackBotVertexMap[toVertex.uuid].owner], playerColors)}
          uCylinderDistance={distance}
          uFromVertexOwnershipPercentage={fromVertexOwnershipPercentage}
          uToVertexOwnershipPercentage={toVertexOwnershipPercentage}
        />
      </mesh>
    </>
  );
};
