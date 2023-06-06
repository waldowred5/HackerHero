import {
  IconWrapper,
  ResourceGenerationHeading,
  ResourceHeading,
  ResourcePanelWrapper,
  PrimaryRowWrapper,
  SecondaryRowWrapper
} from './styles';
import { FaLaptopCode, HiChip } from 'react-icons/all';
import { RESOURCE } from '@/store/resource/types';
import { PLAYER } from '@/store/player/types';

interface Props {
  resources: {
    [key: string]: {
      [key: string]: number,
      [key: string]: number,
      [key: string]: number,
    },
    [key: string]: {
      [key: string]: number,
      [key: string]: number,
      [key: string]: number,
    },
  };
  resourcesPerSecond: {
    [key: string]: {
      [key: string]: number,
      [key: string]: number,
      [key: string]: number,
    },
    [key: string]: {
      [key: string]: number,
      [key: string]: number,
      [key: string]: number,
    },
  },
  selectedPlayer: PLAYER;
}

export const ResourcePanel = ({ resources, resourcesPerSecond, selectedPlayer }: Props) => {
  return (
    <ResourcePanelWrapper
      $color={selectedPlayer === PLAYER.PLAYER_1 ? 'cyan' : 'orange'}
    >
      <PrimaryRowWrapper>
        <IconWrapper
          color={'#00ff00'}
        >
          <FaLaptopCode/>
        </IconWrapper>
        <SecondaryRowWrapper>
          <ResourceHeading>
            { resources[PLAYER[selectedPlayer]][RESOURCE.HACKING_POWER] }
          </ResourceHeading>
          <ResourceGenerationHeading>
            +{ resourcesPerSecond[PLAYER[selectedPlayer]][RESOURCE.HACKING_POWER] }/sec
          </ResourceGenerationHeading>
        </SecondaryRowWrapper>
      </PrimaryRowWrapper>
      <PrimaryRowWrapper>
        <IconWrapper
          color={'#ffff00'}
        >
          <HiChip/>
        </IconWrapper>
        <SecondaryRowWrapper>
          <ResourceHeading>
            { resources[PLAYER[selectedPlayer]][RESOURCE.COMPUTE_POWER] }
          </ResourceHeading>
          <ResourceGenerationHeading>
            +{ resourcesPerSecond[PLAYER[selectedPlayer]][RESOURCE.COMPUTE_POWER] }/sec
          </ResourceGenerationHeading>
        </SecondaryRowWrapper>
      </PrimaryRowWrapper>
    </ResourcePanelWrapper>
  );
};
