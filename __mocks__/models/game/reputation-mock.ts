import type { Reputation } from 'interfaces/models/game/reputation';
import { serverMock } from 'mocks/models/game/server-mock';

export const playerReputationMock: Reputation = {
  serverId: serverMock.id,
  faction: 'player',
  percentage: 0,
  reputationLevel: 'player',
};

export const npcReputationMock: Reputation = {
  serverId: serverMock.id,
  faction: 'npc1',
  percentage: 0,
  reputationLevel: 'friendly',
};
