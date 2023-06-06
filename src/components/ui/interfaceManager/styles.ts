import styled from 'styled-components';

export const InterfaceWrapper = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  pointer-events: none;
  color: #ffffff;
  font-family: Bangers, serif;
  z-index: 10;
`;

export const HorizontalPin = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100vw;
`;
