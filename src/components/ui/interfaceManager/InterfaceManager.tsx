import {
  InterfaceWrapper
} from './styles';
import { ResourcePanel } from '../resourcePanel/ResourcePanel';
import { TimePanel } from '../timePanel/TimePanel';
import useResourceState from '@/store/resource/useResourceState';
import useSceneState from '@/store/scene/useSceneState';
import { SCENE } from '@/store/scene/types';
import { HackBotSelectPanel } from '@/components/ui/hackBotSelectPanel/HackBotSelectPanel';
import useHackBotState from '@/store/hackBot/useHackBotState';
import { shallow } from 'zustand/shallow';
import usePlayerState from '@/store/player/usePlayerState';

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
        </>
      }
    </InterfaceWrapper>
  );
};
