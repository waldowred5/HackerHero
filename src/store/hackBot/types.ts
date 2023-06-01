import { PLAYER } from '@/store/player/types';
import { RESOURCE } from '@/store/resource/types';

// TODO: Come up with more creative names for these
export enum HACK_BOT_CLASS {
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

export type HackBot = {
  botClass: keyof typeof HACK_BOT_CLASS,
  resourceCost: number,
  resourceRequirement: keyof typeof RESOURCE,
  resourcesPerSecond: number,
  resourcesPerSecondType: keyof typeof RESOURCE,
  owner: keyof typeof PLAYER,
  uuid: string,
}

export type HackBotBlueprint = {
  botClass: keyof typeof HACK_BOT_CLASS,
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
  selectedHackBotBlueprint: HackBotBlueprint,

  // Actions
  createHackBot: (uuid: string, player: PLAYER) => void,
  deleteHackBot: (uuid: string) => void
  resetHackBots: () => void,
}
