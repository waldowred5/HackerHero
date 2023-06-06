import { PLAYER } from '@/store/player/types';
import { RESOURCE } from '@/store/resource/types';

// TODO: Come up with more creative names for these
export enum HACK_BOT_CLASS_LIST {
  GENERATE_HACKING_POWER = 'GENERATE_HACKING_POWER',
  GENERATE_COMPUTE_POWER = 'GENERATE_COMPUTE_POWER',
  FLOOD_HACK = 'FLOOD_HACK',
  DRAIN = 'DRAIN',
  FIREWALL = 'FIREWALL',
  SENTRY = 'SENTRY',
  VIRUS = 'VIRUS',
  ANTIVIRUS = 'ANTIVIRUS',
  DDOS = 'DDOS',
}

export interface HackBotBlueprintMap {
  [key: string]: HackBotBlueprint,
}

export const HACK_BOT_CLASS_LIST_MAP = {
  [HACK_BOT_CLASS_LIST.GENERATE_HACKING_POWER]: {
    botClass: HACK_BOT_CLASS_LIST.GENERATE_HACKING_POWER,
    resourceCost: 200,
    resourceRequirement: RESOURCE.HACKING_POWER,
    resourcesPerSecond: 2,
    resourcesPerSecondType: RESOURCE.HACKING_POWER,
  },
  [HACK_BOT_CLASS_LIST.FLOOD_HACK]: {
    botClass: HACK_BOT_CLASS_LIST.FLOOD_HACK,
    resourceCost: 50,
    resourceRequirement: RESOURCE.HACKING_POWER,
    resourcesPerSecond: 0,
    resourcesPerSecondType: RESOURCE.NONE,
  }
};

export type HackBot = {
  botClass: keyof typeof HACK_BOT_CLASS_LIST,
  resourceCost: number,
  resourceRequirement: keyof typeof RESOURCE,
  resourcesPerSecond: number,
  resourcesPerSecondType: keyof typeof RESOURCE,
  owner: keyof typeof PLAYER,
  uuid: string,
}

export type HackBotBlueprint = {
  botClass: keyof typeof HACK_BOT_CLASS_LIST,
  resourceCost: number,
  resourceRequirement: keyof typeof RESOURCE,
  resourcesPerSecond: number,
  resourcesPerSecondType: keyof typeof RESOURCE,
}

export interface HackBotMap {
  [key: string]: HackBot,
}

export interface HackBotState {
  hackBots: HackBotMap,
  hackBotBlueprints: HackBotBlueprintMap,
  selectedHackBotBlueprint: string,

  // Actions
  createHackBot: (uuid: string, player: keyof typeof PLAYER) => void,
  deleteHackBot: (uuid: string) => void
  resetHackBots: () => void,
  updateSelectedHackBotBlueprint: (hackBotBlueprint: string) => void,
}
