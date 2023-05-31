import { PLAYER } from '@/store/player/types';
import { RESOURCE } from '@/store/resource/types';
import { Vertex } from '@/store/vertex/types';

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
  owner: keyof typeof PLAYER,
  uuid: string,
  vertex: Vertex,
}

export interface HackBotProps {
  vertex: Vertex,
}

export interface HackBotState {
  hackBots: HackBot[],

  // Actions
  createHackBot: (
    {
      vertex,
    }: HackBotProps
  ) => void,
  deleteHackBot: (uuid: string) => void
  resetHackBots: () => void,
}
