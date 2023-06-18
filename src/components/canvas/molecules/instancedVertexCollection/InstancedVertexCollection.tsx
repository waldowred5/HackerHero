import { Vertex, VertexMap } from '@/store/vertex/types';
import { PLAYER, PLAYER_COLOR } from '@/store/player/types';
import { HackBotMap } from '@/store/hackBot/types';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Color, InstancedBufferAttribute, InstancedMesh, Object3D } from 'three';
import { VertexModelLabel } from '@/components/canvas/atoms/vertexModelLabel/VertexModelLabel';
import { HackBotModel } from '@/components/canvas/atoms/hackBotModel/HackBotModel';
import { Intersection } from '@react-three/fiber';

interface Props {
  hackBots: HackBotMap,
  handleHackBotCreation: (vertexId: string) => void,
  handleHackBotDeletion: (vertexId: string) => void,
  playerColors: PLAYER_COLOR,
  vertices: VertexMap;
}

// ✅ TODO: Change color of vertex on hover
// ✅ TODO: Add vertex UUID text
// ✅ TODO: Add hackBot to vertex
// ✅ TODO: Remove hackBot from vertex
// ✅ TODO: Change color of vertex on hackBot add / remove
// TODO: Remove vertices dependency (performance improvement)

export const InstancedVertexCollection = (
  {
    hackBots,
    handleHackBotCreation,
    handleHackBotDeletion,
    playerColors,
    vertices
  }: Props) => {
  const ref = useRef<InstancedMesh | null>(null);
  const count = Object.entries(vertices).length;
  const transform = new Object3D();

  const neutralColor = new Color('lightgrey');
  const playerOneColor = new Color('cyan');
  const playerTwoColor = new Color('orange');

  const [prevInstanceId, setPrevInstanceId] = useState<number>(-1);
  const [instanceIdMap, setInstanceIdMap] = useState<string[]>([]);

  useEffect(() => {
    // TODO: Is this better?
    // https://github.com/pmndrs/react-three-fiber/discussions/761
    // useLayoutEffect(() => {
    if (ref.current === null) {
      return;
    }

    const vertexIds = [];

    Object.entries(vertices).forEach((vertexEntry, index) => {
      const vertex: Vertex = vertexEntry[1];
      vertexIds.push(vertexEntry[0]);

      transform.position.set(vertex.vector.x, vertex.vector.y, vertex.vector.z);
      transform.updateMatrix();
      ref.current?.setMatrixAt(index, transform.matrix);

      const color = playerColors[PLAYER[vertex.owner]].edge;
      ref.current?.setColorAt(index, new Color(color[0], color[1], color[2]));
    });

    setInstanceIdMap(vertexIds);

    // Update the instance
    ref.current.instanceMatrix.needsUpdate = true;

    console.log('InstancedVertexCollection: useEffect: triggered');
  }, [vertices]); // TODO: Avoid re-rendering on hackBot change

  // TODO: Performance Improvement
  // TODO: This function runs too slowly, as a result color set is delayed and sometimes not reset onPointLeave
  const setColor = (event, eventObject: InstancedMesh, intersections: Intersection[], colorCatgory) => {
    const owner = vertices[instanceIdMap[event.instanceId]].owner;
    const oldColor = playerColors[PLAYER[owner]].edge;
    const newColor = playerColors[PLAYER[owner]][colorCatgory];

    // const setColor = (event) => {
    if (intersections.length > 0) {
      const currentInstanceId = intersections[0].instanceId;

      eventObject.setColorAt(prevInstanceId, new Color(oldColor[0], oldColor[1], oldColor[2]));
      eventObject.setColorAt(currentInstanceId, new Color(newColor[0], newColor[1], newColor[2]));

      eventObject.instanceColor.needsUpdate = true;
      setPrevInstanceId(currentInstanceId);
    } else {
      eventObject.setColorAt(prevInstanceId, new Color(oldColor[0], oldColor[1], oldColor[2]));
      eventObject.instanceColor.needsUpdate = true;
      setPrevInstanceId(-1);
    }
  };

  const leftClickHandler = (event) => {
    handleHackBotCreation(instanceIdMap[event.instanceId]);
  };

  const rightClickHandler = (event) => {
    if (!vertices[instanceIdMap[event.instanceId]].hackBotId) {
      console.log('No HackBot to remove!');

      return;
    }

    handleHackBotDeletion(instanceIdMap[event.instanceId]);
  };

  return (
    <group>
      <instancedMesh
        ref={ref}
        args={[null, null, count]}
        onPointerEnter={(event) => setColor(event, event.eventObject, event.intersections, 'hackBot')}
        onPointerLeave={(event) => setColor(event, event.eventObject, event.intersections, 'vertex')}
        onClick={(event) => leftClickHandler(event)}
        onContextMenu={(event) => rightClickHandler(event)}
      >
        <sphereGeometry args={[0.06, 16, 16]}/>
        <meshBasicMaterial
          toneMapped={false}
        />
      </instancedMesh>
      {
        Object.entries(vertices).map((vertex) => {
          return (
            <group
              key={`Vertex: ${vertex[0]}`}
            >
              <VertexModelLabel
                vertex={vertex[1]}
                uuid={vertex[0]}
              />
              {
                vertex[1].hackBotId && <HackBotModel
                  key={`HackBot: ${vertex[1].hackBotId}`}
                  owner={vertex[1].owner}
                  playerColors={playerColors}
                  hackBotClass={hackBots[vertex[1].hackBotId].botClass}
                  vector={vertex[1].vector}
                />
              }
            </group>
          );
        })
      }
    </group>
  );
};
