import React from 'react';
import { NetworkController } from '../../../controllers/networkController/NetworkController';
import { SkyBox } from '../../atoms/skyBox/SkyBox';

export const Match = () => {
  return (
    <>
      <NetworkController/>
      <SkyBox/>
    </>
  );
};
