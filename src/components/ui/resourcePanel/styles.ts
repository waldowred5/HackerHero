import styled from 'styled-components';

export const ResourcePanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  color: #ffffff;
  padding: 36px;
  text-align: center;
`;

export const PrimaryRowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 24px;
`;

export const SecondaryRowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 12px;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: ${({ color }) => color};
`;

export const ResourceHeading = styled.h1`
  font-size: 48px;
  align-self: center;
  justify-content: center;
  font-style: italic;
  font-weight: 800;
  letter-spacing: 2px;
`;

export const ResourceGenerationHeading = styled.h3`
  font-size: 24px;
  line-height: 36px;
  align-self: flex-end;
  justify-content: center;
  font-style: italic;
  font-weight: 600;
  letter-spacing: 2px;
  color: #96ff8e;
`;
