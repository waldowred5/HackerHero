import React, { useRef } from 'react';
import * as THREE from 'three';
import { Vertex } from '../../../controllers/networkController/types';

interface Props {
  fromVector: Vertex;
  toVector: Vertex;
  highlight: boolean;
}

export const Edge = ({ fromVector, toVector, highlight }: Props) => {
  const cylinderRadius = 0.02;
  const cylinderTesselation = {
    radial: 16,
    length: 32,
  };

  const distance = fromVector.vector.distanceTo(toVector.vector);
  const cylinderGeom = new THREE.CylinderGeometry(
    cylinderRadius,
    cylinderRadius,
    distance * 0.45,
    cylinderTesselation.radial,
    cylinderTesselation.length,
  );

  cylinderGeom.translate(0, distance / 1.38, 0);
  cylinderGeom.rotateX(Math.PI / 2);

  const cylinder = new THREE.Mesh(
    cylinderGeom,
    new THREE.MeshStandardMaterial({
      color: highlight ? 'blue' : 'grey',
    }),
  );

  cylinder.position.copy(toVector.vector);
  cylinder.lookAt(fromVector.vector);

  return (
    <>
      <primitive
        object={cylinder}
      />
    </>
  );
};
