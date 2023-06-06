import { create } from 'zustand';
import { HACK_BOT_CLASS_LIST, HACK_BOT_CLASS_LIST_MAP, HackBot, HackBotState } from '@/store/hackBot/types';
import { RESOURCE } from '@/store/resource/types';
import { PLAYER } from '@/store/player/types';
import useResourceState from '@/store/resource/useResourceState';

export default create<HackBotState>((set, get) => {
  return {
    hackBots: {},
    hackBotBlueprints: HACK_BOT_CLASS_LIST_MAP,
    selectedHackBotBlueprint: HACK_BOT_CLASS_LIST.GENERATE_HACKING_POWER,

    // Actions
    createHackBot: (uuid: string, player: PLAYER) => {
      const newHackBot: HackBot = {
        ...get().hackBotBlueprints[get().selectedHackBotBlueprint],
        owner: player,
        uuid,
      };

      // Add new HackBot to HackBots
      set((state) => {
        return {
          hackBots: {
            ...state.hackBots,
            [uuid]: {
              ...newHackBot,
            }
          },
        };
      });
    },

    deleteHackBot: (uuid: string) => {
      set((state) => {
        const hackBots =
          Object.keys(state.hackBots)
            .filter((hackBotId) => hackBotId !== uuid)
            .reduce((acc, hackBotId) => {
              acc[hackBotId] = state.hackBots[hackBotId];

              return acc;
            }, {});

        return {
          hackBots,
        };
      });
    },

    resetHackBots: () => {
      set({
        hackBots: {},
      });
    },

    updateSelectedHackBotBlueprint: (hackBotBlueprint: string) => {
      set({
        selectedHackBotBlueprint: hackBotBlueprint,
      });
    }
  };
});
