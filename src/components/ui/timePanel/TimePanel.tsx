import React, { useEffect, useRef } from 'react';
import { TimeHeading, TimePanelWrapper } from './styles';
import { addEffect } from '@react-three/fiber';
import useNetworkState from '../../controllers/networkController/useNetworkState';
import { MATCH_PHASE } from '../../controllers/networkController/types';

export const TimePanel = () => {
  const timeRef = useRef<HTMLHeadingElement | null>(null);

  // Start Timer
  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const { matchPhase, matchStartTime, matchEndTime } = useNetworkState.getState();

      let elapsedTime = 0;

      if (matchPhase === MATCH_PHASE.ACTIVE_MATCH) {
        elapsedTime = Date.now() - matchStartTime;
      } else if (matchPhase === MATCH_PHASE.POST_MATCH) {
        elapsedTime = matchEndTime - matchStartTime;
      }

      elapsedTime /= 1000;
      elapsedTime = Number(elapsedTime.toFixed(2));

      if (timeRef.current) {
        timeRef.current.textContent = elapsedTime.toString();
      }
    });

    return () => {
      unsubscribeEffect();
    };
  }, []);

  return (
    <TimePanelWrapper>
        <TimeHeading
          ref={timeRef}
        >
          0.00
        </TimeHeading>
    </TimePanelWrapper>
  );
};
