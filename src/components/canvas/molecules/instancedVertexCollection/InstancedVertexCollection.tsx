import { Vertex, VertexMap } from '@/store/vertex/types';
import { PLAYER, PLAYER_COLOR } from '@/store/player/types';
import { HackBotMap } from '@/store/hackBot/types';
import { useEffect, useRef, useState } from 'react';
import { Color, InstancedMesh, Object3D } from 'three';
import { VertexModelLabel } from '@/components/canvas/atoms/vertexModelLabel/VertexModelLabel';
import { HackBotModel } from '@/components/canvas/atoms/hackBotModel/HackBotModel';
import { Intersection } from '@react-three/fiber';
import { HackBotVertexMap } from '@/store/relation/types';

interface Props {
  hackBots: HackBotMap,
  hackBotVertexMap: HackBotVertexMap,
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
// TODO: Resolve app freeze on hackBot add / remove (performance improvement)
// TODO: Update vertex color on level reset

export const InstancedVertexCollection = (
  {
    hackBots,
    hackBotVertexMap,
    handleHackBotCreation,
    handleHackBotDeletion,
    playerColors,
    vertices
  }: Props) => {
  const ref = useRef<InstancedMesh | null>(null);
  const count = Object.entries(vertices).length;
  const transform = new Object3D();

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

      const color = playerColors[PLAYER[hackBotVertexMap[vertex.uuid].owner]].edge;
      ref.current?.setColorAt(index, new Color(color[0], color[1], color[2]));
    });

    setInstanceIdMap(vertexIds);

    // Update the instance
    ref.current.instanceMatrix.needsUpdate = true;

    console.log('InstancedVertexCollection: useMemo: triggered');
  }, [vertices]);

  // TODO: Performance Improvement
  // TODO: This function runs too slowly, as a result color set is delayed and sometimes not reset onPointLeave
  const setColor = (event, eventObject: InstancedMesh, intersections: Intersection[], colorCatgory) => {
    const owner = hackBotVertexMap[instanceIdMap[event.instanceId]].owner;
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
    if (!hackBotVertexMap[instanceIdMap[event.instanceId]].hackBotId) {
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
                hackBotVertexMap[vertex[1].uuid].hackBotId && <HackBotModel
                  key={`HackBot: ${hackBotVertexMap[vertex[1].uuid].hackBotId}`}
                  owner={hackBotVertexMap[vertex[1].uuid].owner}
                  playerColors={playerColors}
                  hackBotClass={hackBots[hackBotVertexMap[vertex[1].uuid].hackBotId].botClass}
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
