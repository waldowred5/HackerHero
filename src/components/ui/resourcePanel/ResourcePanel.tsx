import React from 'react';
import {
  IconWrapper,
  ResourceGenerationHeading,
  ResourceHeading,
  ResourcePanelWrapper,
  PrimaryRowWrapper,
  SecondaryRowWrapper
} from './styles';
import { FaLaptopCode, HiChip } from 'react-icons/all';
import { RESOURCE } from '../../controllers/networkController/types';

interface Props {
  resources: {
    [key: string]: number,
  };
  resourcesPerSecond: {
    [key: string]: number,
  }
}

export const ResourcePanel = ({ resources, resourcesPerSecond }: Props) => {
  return (
    <ResourcePanelWrapper>
      <PrimaryRowWrapper>
        <IconWrapper
          color={'#00ff00'}
        >
          <FaLaptopCode/>
        </IconWrapper>
        <SecondaryRowWrapper>
          <ResourceHeading>
            { resources[RESOURCE.HACKING_POWER] }
          </ResourceHeading>
          <ResourceGenerationHeading>
            +{ resourcesPerSecond[RESOURCE.HACKING_POWER] }/sec
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
            { resources[RESOURCE.COMPUTE_POWER] }
          </ResourceHeading>
          <ResourceGenerationHeading>
            +{ resourcesPerSecond[RESOURCE.COMPUTE_POWER] }/sec
          </ResourceGenerationHeading>
        </SecondaryRowWrapper>
      </PrimaryRowWrapper>
    </ResourcePanelWrapper>
  );
};
