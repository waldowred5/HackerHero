import React, { useRef } from 'react';
import * as THREE from 'three';
import { Vertex } from '../../../controllers/networkController/types';
import vertexShader from '../../../../assets/shaders/cylinders/vertex.glsl';
import fragmentShader from '../../../../assets/shaders/cylinders/fragment.glsl';

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
    distance,
    // distance * 0.45,
    cylinderTesselation.radial,
    cylinderTesselation.length,
  );

  cylinderGeom.translate(0, distance / 2, 0);
  cylinderGeom.rotateX(Math.PI / 2);

  const cylinderMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      cylinderColor1: { value: new THREE.Color('blue') },
      cylinderColor2: { value: new THREE.Color('red') },
      cylinderColor3: { value: new THREE.Color('grey') },
      cylinderRadius: { value: cylinderRadius },
      cylinderHeight: { value: distance },
    }
  });

  const cylinder = new THREE.Mesh(
    cylinderGeom,
    // new THREE.MeshStandardMaterial({
    //   color: highlight ? 'blue' : 'grey',
    // }),
    cylinderMaterial,
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
