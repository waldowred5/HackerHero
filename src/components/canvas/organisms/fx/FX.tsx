import { Bloom, EffectComposer } from '@react-three/postprocessing';
import useGameSettingState from '@/store/gameSettings/useGameSettingState';
import { shallow } from 'zustand/shallow';
import { useControls } from 'leva';

export const FX = () => {
  const {
    bloomEnabled,
    updateBloomEnabled,
  } = useGameSettingState((state) => {
    return {
      bloomEnabled: state.bloomEnabled,
      updateBloomEnabled: state.updateBloomEnabled,
    };
  }, shallow);

  // Debug
  useControls('Game Settings', {
    bloomEnabled: {
      value: bloomEnabled,
      onChange: (value: boolean) => {
        updateBloomEnabled(value);
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
