import { Bloom, EffectComposer } from '@react-three/postprocessing';
import useGameSettingState from '@/store/gameSettings/useGameSettingState';
import { shallow } from 'zustand/shallow';
import { useControls } from 'leva';

export const FX = () => {
  const {
    bloomEnabled,
    statsDebugPanelEnabled,
    updateBloomEnabled,
    updateStatsDebugPanelEnabled,
  } = useGameSettingState((state) => {
    return {
      bloomEnabled: state.bloomEnabled,
      statsDebugPanelEnabled: state.statsDebugPanelEnabled,
      updateBloomEnabled: state.updateBloomEnabled,
      updateStatsDebugPanelEnabled: state.updateStatsDebugPanelEnabled,
    };
  }, shallow);

  // Debug
  useControls('Game Settings', {
    bloomEnabled: {
      value: bloomEnabled,
      onChange: (value: boolean) => {
        updateBloomEnabled(value);
      }
    },
    statsEnabled: {
      value: statsDebugPanelEnabled,
      onChange: (value: boolean) => {
        updateStatsDebugPanelEnabled(value);
      }
    }
  });

  return (
    <>
      {bloomEnabled &&
        <EffectComposer multisampling={4}>
          <Bloom mipmapBlur/>
        </EffectComposer>
      }

    </>
  );
};
