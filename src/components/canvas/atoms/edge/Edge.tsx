import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { RESOURCE, Vertex } from '../../../controllers/networkController/types';
import vertexShader from '../../../../assets/shaders/cylinders/vertex.glsl';
import fragmentShader from '../../../../assets/shaders/cylinders/fragment.glsl';
import { useControls } from 'leva';

interface Props {
  fromVector: Vertex;
  // fromVector: THREE.Vector3;
  toVector: Vertex;
  // toVector: THREE.Vector3;
  highlight: boolean;
}

export const Edge = ({ fromVector, toVector, highlight }: Props) => {
  const [ownershipPercentage, setOwnershipPercentage] = useState(0.0);
  const [directionToggle, setDirectionToggle] = useState(true);

  useControls('Edges', {
    ownershipPercentage: {
      value: 0.0,
      min: 0.0,
      max: 1.0,
      step: 0.01,
      onChange: (value: number) => {
        setOwnershipPercentage(value);
      }
    },
    directionToggle: {
      value: directionToggle,
      onChange: (value: boolean) => {
        setDirectionToggle(value);
      }
    },
  });

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
  // cylinderGeom.translate(0.05, distance / 2, 0.05);
  cylinderGeom.rotateX(Math.PI / 2);

  const cylinderMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      cylinderColor1: { value: new THREE.Color('blue') },
      cylinderColor2: { value: new THREE.Color('red') },
      cylinderColor3: { value: new THREE.Color('lightgrey') },
      cylinderRadius: { value: cylinderRadius },
      cylinderHeight: { value: distance },
      ownershipPercentage: { value: ownershipPercentage },
      // TODO: Figure out how to dynamically set directionToggle based on the direction of the edge and the vertex owner
      directionToggle: { value: directionToggle },
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
