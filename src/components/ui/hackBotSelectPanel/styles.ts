import styled from 'styled-components';

export const HackBotSelectPanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 30%;
  left: 0;
  color: #ffffff;
  padding: 36px;
  text-align: center;
  row-gap: 36px;
`;

type ElementProps = {
  $elementColor: string;
}

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  align-items: center;
  color: ${({ $elementColor }: ElementProps) => $elementColor};
`;

export const SelectHackBotButton = styled.button`
  pointer-events: auto;
  display: flex;
  background-color: transparent;
  border-radius: 100%;
  border: none;
  outline: none;
  color: ${({ $elementColor }: ElementProps) => $elementColor};
  
  &:hover {
    box-shadow: 0 0 10px lightgray;
  }
`;

export const SelectRing = styled.div`
  display: flex;
  border-radius: 100%;
  border: 4px solid ${({ $elementColor }: ElementProps) => $elementColor};
  width: 90px;
  height: 90px;
  align-items: center;
  justify-content: center;
  font-size: 48px;
`;

export const CostHeadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 12px;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;

export const StyledHeading = styled.h3`
  font-size: 24px;
  line-height: 36px;
  font-weight: 400;
  letter-spacing: 2px;
  font-family: Bangers, serif;
`;
