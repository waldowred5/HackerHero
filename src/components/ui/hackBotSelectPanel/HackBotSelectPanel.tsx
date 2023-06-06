import {
  CostHeadingWrapper,
  HackBotSelectPanelWrapper,
  SelectRing,
  SelectHackBotButton,
  StyledHeading,
  SelectWrapper,
} from './styles';
import { BsFillDiamondFill, FaLaptopCode, MdDonutLarge } from 'react-icons/all';
import { HACK_BOT_CLASS_LIST } from '@/store/hackBot/types';

interface Props {
  selectedHackBotBlueprint: string;
  updateSelectedHackBotBlueprint: (hackBotBlueprint: string) => void;
}

const getColor = (hackBotBlueprint: string, selectedHackBotBlueprint: string) => {
  return HACK_BOT_CLASS_LIST[selectedHackBotBlueprint] === hackBotBlueprint ? 'white' : 'grey';
};

export const HackBotSelectPanel = ({ selectedHackBotBlueprint, updateSelectedHackBotBlueprint }: Props) => {
  return (
    <HackBotSelectPanelWrapper>
      <SelectWrapper
        $elementColor={() => getColor(HACK_BOT_CLASS_LIST.GENERATE_HACKING_POWER, selectedHackBotBlueprint)}
      >
        <StyledHeading>
          GENERATE
        </StyledHeading>
        <SelectHackBotButton
          $elementColor={getColor(HACK_BOT_CLASS_LIST.GENERATE_HACKING_POWER, selectedHackBotBlueprint)}
          onClick={() => updateSelectedHackBotBlueprint(HACK_BOT_CLASS_LIST.GENERATE_HACKING_POWER)}
        >
          <SelectRing>
            <MdDonutLarge/>
          </SelectRing>
        </SelectHackBotButton>
        <CostHeadingWrapper>
          <FaLaptopCode/>
          <StyledHeading>200</StyledHeading>
        </CostHeadingWrapper>
      </SelectWrapper>
      <SelectWrapper
        $elementColor={getColor(HACK_BOT_CLASS_LIST.FLOOD_HACK, selectedHackBotBlueprint)}
      >
        <StyledHeading>
          HACK
        </StyledHeading>
        <SelectHackBotButton
          $elementColor={getColor(HACK_BOT_CLASS_LIST.FLOOD_HACK, selectedHackBotBlueprint)}
          onClick={() => updateSelectedHackBotBlueprint(HACK_BOT_CLASS_LIST.FLOOD_HACK)}
        >
          <SelectRing>
            <BsFillDiamondFill/>
          </SelectRing>
        </SelectHackBotButton>
        <CostHeadingWrapper>
          <FaLaptopCode/>
          <StyledHeading>50</StyledHeading>
        </CostHeadingWrapper>
      </SelectWrapper>
    </HackBotSelectPanelWrapper>
  );
};
