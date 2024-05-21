import { VertexModel } from '../../atoms/vertexModel/VertexModel';
import { VertexMap } from '@/store/vertex/types';
import { HackBotModel } from '@/components/canvas/atoms/hackBotModel/HackBotModel';
import { PLAYER_COLOR } from '@/store/player/types';
import { HackBotMap } from '@/store/hackBot/types';
import { HackBotVertexMap } from '@/store/relation/types';
import { Instances } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { InstancedVertexModel } from '@/components/canvas/atoms/instancedVertexModel/InstancedVertexModel';

interface Props {
  hackBots: HackBotMap,
  hackBotVertexMap: HackBotVertexMap,
  handleHackBotCreation: (vertexId: string) => void,
  handleHackBotDeletion: (vertexId: string) => void,
  playerColors: PLAYER_COLOR,
  useInstancing: boolean;
  vertices: VertexMap;
}

export const VertexCollection = (
  {
    hackBots,
    hackBotVertexMap,
    handleHackBotCreation,
    handleHackBotDeletion,
    playerColors,
    useInstancing,
    vertices
  }: Props) => {
  const ref = useRef();

  // TODO: Investigate why vertices don't appear when using instancing on level reset
  return (
    <>
      {
        useInstancing
          ? <Suspense fallback={null}>
            <Instances
              ref={ref}
              limit={Object.keys(vertices).length}
            >
              <sphereGeometry args={[0.06, 32, 32]}/>
              <meshBasicMaterial
                toneMapped={false}
              />
              {
                Object.entries(vertices).map((vertex) => {
                  return (
                    <group
                      key={`Vertex: ${vertex[0]}`}
                    >
                      <InstancedVertexModel
                        hackBotVertexMap={hackBotVertexMap}
                        handleHackBotCreation={handleHackBotCreation}
                        handleHackBotDeletion={handleHackBotDeletion}
                        playerColors={playerColors}
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
            </Instances>
          </Suspense>
          : Object.entries(vertices).map((vertex) => {
            return (
              <group
                key={`Vertex: ${vertex[0]}`}
              >
                <VertexModel
                  hackBotVertexMap={hackBotVertexMap}
                  handleHackBotCreation={handleHackBotCreation}
                  handleHackBotDeletion={handleHackBotDeletion}
                  playerColors={playerColors}
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
    </>
  );
};
