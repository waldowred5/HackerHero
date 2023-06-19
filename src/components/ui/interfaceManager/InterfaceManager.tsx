import { shallow } from 'zustand/shallow';
import { ResourcePanel } from '../resourcePanel/ResourcePanel';
import { TimePanel } from '../timePanel/TimePanel';
import {
  InterfaceWrapper,
  HorizontalPin,
} from './styles';
import useResourceState from '@/store/resource/useResourceState';
import useSceneState from '@/store/scene/useSceneState';
import useHackBotState from '@/store/hackBot/useHackBotState';
import usePlayerState from '@/store/player/usePlayerState';
import useRelationState from '@/store/relation/useRelationState';
import { SCENE } from '@/store/scene/types';
import { VictoryProgressPanel } from '@/components/ui/victoryProgressPanel/VictoryProgressPanel';
import { HackBotSelectPanel } from '@/components/ui/hackBotSelectPanel/HackBotSelectPanel';

export const InterfaceManager = () => {
  const { scene } = useSceneState((state) => {
    return {
      scene: state.scene,
    };
  }, shallow);

  const { resources, resourcesPerSecond } = useResourceState((state) => {
    return {
      resources: state.resources,
      resourcesPerSecond: state.resourcesPerSecond,
    };
  }, shallow);

  const { selectedHackBotBlueprint, updateSelectedHackBotBlueprint } = useHackBotState((state) => {
    return {
      selectedHackBotBlueprint: state.selectedHackBotBlueprint,
      updateSelectedHackBotBlueprint: state.updateSelectedHackBotBlueprint,
    };
  }, shallow);

  const { selectedPlayer } = usePlayerState((state) => {
    return {
      selectedPlayer: state.selectedPlayer,
    };
  }, shallow);

  const { hackBotVertexMap } = useRelationState((state) => {
    return {
      hackBotVertexMap: state.hackBotVertexMap,
    };
  }, shallow);

  return (
    <InterfaceWrapper>
      {
        scene === SCENE.MATCH &&
        <>
          <ResourcePanel
            resources={resources}
            resourcesPerSecond={resourcesPerSecond}
            selectedPlayer={selectedPlayer}
          />
          <HackBotSelectPanel
            selectedHackBotBlueprint={selectedHackBotBlueprint}
            updateSelectedHackBotBlueprint={updateSelectedHackBotBlueprint}
          />
          <TimePanel/>
          <HorizontalPin>
            <VictoryProgressPanel
              hackBotVertexMap={hackBotVertexMap}
            />
          </HorizontalPin>
        </>
      }
    </InterfaceWrapper>
  );
};
