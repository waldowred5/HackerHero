import { create } from 'zustand';
import { EdgeState } from '@/store/edge/types';

export default create<EdgeState>((set) => {
  return {
    maxEdgeLengthPercentage: 0.97,

    // Actions
    updateMaxEdgeLengthPercentage: (newMaxEdgeLengthPercentage: number) => {
      set(() => {
        return {
          maxEdgeLengthPercentage: newMaxEdgeLengthPercentage,
        };
      });
    },
  };
});
