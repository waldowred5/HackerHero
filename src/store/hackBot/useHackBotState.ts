import { create } from 'zustand';
import { HACK_BOT_CLASS_LIST, HACK_BOT_CLASS_LIST_MAP, HackBot, HackBotState } from '@/store/hackBot/types';
import { PLAYER } from '@/store/player/types';
import useRelationState from '@/store/relation/useRelationState';

export default create<HackBotState>((set, get) => {
  return {
    hackBots: {},
    hackBotBlueprints: HACK_BOT_CLASS_LIST_MAP,
    selectedHackBotBlueprint: HACK_BOT_CLASS_LIST.GENERATE_HACKING_POWER,

    // Actions
    createHackBot: (vertexId, hackBotId, player) => {
      console.log('1');
      const newHackBot: HackBot = {
        ...get().hackBotBlueprints[get().selectedHackBotBlueprint],
        owner: player,
        uuid: hackBotId,
      };

      console.log('2');

      // Add new HackBot to HackBots
      set((state) => {
        return {
          hackBots: {
            ...state.hackBots,
            [hackBotId]: {
              ...newHackBot,
            }
          },
        };
      });

      console.log('3');

      // Add new HackBot to Relation Map
      useRelationState.getState().updateHackBotVertexMap(vertexId, hackBotId, player);

      console.log('4');
    },

    deleteHackBot: (vertexId: string, hackBotToDeleteId: string) => {
      // Delete HackBot from HackBots
      set((state) => {
        const hackBots =
          Object.keys(state.hackBots)
            .filter((hackBotId) => hackBotId !== hackBotToDeleteId)
            .reduce((acc, hackBotId) => {
              acc[hackBotId] = state.hackBots[hackBotId];

              return acc;
            }, {});

        return {
          hackBots,
        };
      });

      // Delete HackBot from Relation Map
      useRelationState.getState().updateHackBotVertexMap(vertexId, null, PLAYER.NEUTRAL);
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
