import { create } from 'zustand';
import { HACK_BOT_CLASS, HackBot, HackBotProps, HackBotState } from '@/store/hackBot/types';
import { v4 as uuidv4 } from 'uuid';
import { RESOURCE } from '@/store/resource/types';
import { PLAYER } from '@/store/player/types';
import useResourceState from '@/store/resource/useResourceState';
import useVertexState from '@/store/vertex/useVertexState';
import useRelationState from '@/store/relation/useRelationState';

export default create<HackBotState>((set, get) => {
  return {
    hackBots: [],

    // Actions
    createHackBot: ({ vertex: hackBotVertex }: HackBotProps) => {
      // Check if a HackBot already exists on Vertex
      if (get().hackBots.find((existing) => existing.vertex.uuid === hackBotVertex.uuid)) {
        return;
      }

      const newHackBot: HackBot = {
        botClass: HACK_BOT_CLASS.GENERATE_HACKING_POWER,
        resourceCost: 100,
        resourceRequirement: RESOURCE.HACKING_POWER,
        owner: PLAYER.PLAYER_1,
        uuid: uuidv4(),
        vertex: hackBotVertex,
      };

      // Check resource cost
      const canAffordNewHackBot = useResourceState.getState().resources[newHackBot.resourceRequirement] >= newHackBot.resourceCost;

      if (!canAffordNewHackBot) {
        // TODO: Play error sound here

        return;
      }

      // Pay resource cost
      if (useResourceState.getState().resources[newHackBot.resourceRequirement] < newHackBot.resourceCost) {
        return;
      }

      useResourceState.getState().updateResource(RESOURCE[newHackBot.resourceRequirement], -newHackBot.resourceCost);

      // Add new HackBot to HackBots
      set((state) => {
        return {
          hackBots: [
            ...state.hackBots,
            newHackBot,
          ],
        };
      });

      // TODO: Do we need to manage this in 2 places?
      // Look at managing HackBot list directly from vertices
      // Don't directly update another store's state, call an update function on the other store
      // This will be fixed by using relation store
      // Add new HackBot to Vertex
      useVertexState.getState().updateVertices(hackBotVertex.uuid, newHackBot);

      // Update Vertex owner in EdgeNeighbours
      // TODO: Fix bug where contested edge only shows contest progress from one direction
      // This kind of store update should never be required
      // The edgeNeighbours map should only have a reference to the vertex that has been updated
      useRelationState.getState().updateEdgeNeighbours(hackBotVertex.uuid);

      useResourceState.getState().updateResourcesPerSecond(RESOURCE.HACKING_POWER, 2);
    },

    deleteHackBot: (uuid: string) => {
      set((state) => {
        useResourceState.getState().updateResourcesPerSecond(RESOURCE.HACKING_POWER, -2);

        return {
          hackBots: state.hackBots.filter((hackBot) => hackBot.uuid !== uuid),
        };
      });
    },

    resetHackBots: () => {
      set({
        hackBots: [],
      });
    },
  };
});
