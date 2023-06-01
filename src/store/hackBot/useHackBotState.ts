import { create } from 'zustand';
import { HACK_BOT_CLASS, HackBot, HackBotState } from '@/store/hackBot/types';
import { RESOURCE } from '@/store/resource/types';
import { PLAYER } from '@/store/player/types';
import useResourceState from '@/store/resource/useResourceState';

export default create<HackBotState>((set, get) => {
  return {
    hackBots: {},
    selectedHackBotBlueprint: {
      botClass: HACK_BOT_CLASS.GENERATE_HACKING_POWER,
      resourceCost: 100,
      resourceRequirement: RESOURCE.HACKING_POWER,
      resourcesPerSecond: 2,
      resourcesPerSecondType: RESOURCE.HACKING_POWER,
    }, // TODO: Replace this with string access from hackBotBlueprints map?

    // Actions
    createHackBot: (uuid: string, player: PLAYER) => {
      const newHackBot: HackBot = {
        ...get().selectedHackBotBlueprint,
        owner: player,
        uuid,
      };

      // Add new HackBot to HackBots
      set((state) => {
        return {
          hackBots: {
            ...state.hackBots,
            newHackBot,
          },
        };
      });
    },

    deleteHackBot: (uuid: string) => {
      useResourceState.getState().updateResourcesPerSecond(RESOURCE.HACKING_POWER, -2);

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
  };
});
