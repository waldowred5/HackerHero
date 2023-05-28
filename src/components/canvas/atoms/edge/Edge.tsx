import React, { useState } from 'react';
import * as THREE from 'three';
import { Vertex } from '../../../controllers/networkController/types';
import vertexShader from '../../../../assets/shaders/cylinders/vertex.glsl';
import fragmentShader from '../../../../assets/shaders/cylinders/fragment.glsl';
import { useControls } from 'leva';

interface Props {
  fromVertex: Vertex;
  toVertex: Vertex;
}

export const Edge = ({ fromVertex, toVertex }: Props) => {
  const [fromVertexOwnershipPercentage, setFromVertexOwnershipPercentage] = useState(0.0);
  const [toVertexOwnershipPercentage, setVertexToOwnershipPercentage] = useState(0.0);

  useControls('Edges', {
    fromVertexOwnershipPercentage: {
      value: 0.0,
      min: 0.0,
      max: 1.0,
      step: 0.01,
      onChange: (value: number) => {
        setFromVertexOwnershipPercentage(value);
      }
    },
    toVertexOwnershipPercentage: {
      value: 0.0,
      min: 0.0,
      max: 1.0,
      step: 0.01,
      onChange: (value: number) => {
        setVertexToOwnershipPercentage(value);
      }
    },
  });

  const cylinderRadius = 0.02;
  const cylinderTesselation = {
    radial: 16,
    length: 32,
  };

  const distance = fromVertex.vector.distanceTo(toVertex.vector);
  const cylinderGeom = new THREE.CylinderGeometry(
    cylinderRadius,
    cylinderRadius,
    distance,
    cylinderTesselation.radial,
    cylinderTesselation.length,
  );

  cylinderGeom.translate(0, distance / 2, 0);
  cylinderGeom.rotateX(Math.PI / 2);

  const cylinderMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uCylinderColorBase: { value: new THREE.Color('lightgrey') },
      uCylinderColorFromVertex: { value: new THREE.Color('blue') },
      uCylinderColorToVertex: { value: new THREE.Color('red') },
      uCylinderDistance: { value: distance },
      uFromVertexOwnershipPercentage: { value: fromVertexOwnershipPercentage },
      uToVertexOwnershipPercentage: { value: toVertexOwnershipPercentage },
    }
  });

  const cylinder = new THREE.Mesh(
    cylinderGeom,
    cylinderMaterial,
  );

  cylinder.position.copy(toVertex.vector);
  cylinder.lookAt(fromVertex.vector);

  return (
    <>
      <primitive
        object={cylinder}
      />
    </>
  );
};
