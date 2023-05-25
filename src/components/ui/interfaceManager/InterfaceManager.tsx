import React from 'react';
import {
  InterfaceWrapper
} from './styles';
import { ResourcePanel } from '../resourcePanel/ResourcePanel';
import useSceneState, { SCENE } from '../../managers/sceneManager/useSceneState';
import useNetworkState from '../../controllers/networkController/useNetworkState';
import { TimePanel } from '../timePanel/TimePanel';

export const InterfaceManager = () => {
  const { scene } = useSceneState();
  const { resources, resourcesPerSecond } = useNetworkState();
  // Debug
  // useControls('StatsBar', {
  //   finance: folder({
  //     balanceDebug: folder({
  //       'reset balance': button(() => {
  //         setBalance(0);
  //       }),
  //       '+100k': button(() => {
  //         updateBalance(100000);
  //       }),
  //     }),
  //     incomeDebug: folder({
  //       'reset income': button(() => {
  //         setIncome(0);
  //       }),
  //       '+1K': button(() => {
  //         updateIncome(1000);
  //       }),
  //     }),
  //   }),
  //   ships: folder({
  //     removeShip: button(() => {
  //       deleteShip(0);
  //     }),
  //   }),
  //   crew: folder({
  //     removeCrewMember: button(() => {
  //       deleteCrewMember(0);
  //     }),
  //   })
  // });

  return (
    <InterfaceWrapper>
      {
        scene === SCENE.MATCH &&
        <>
          <ResourcePanel
            resources={resources}
            resourcesPerSecond={resourcesPerSecond}
          />
          <TimePanel/>
        </>
      }
    </InterfaceWrapper>
  );
};
