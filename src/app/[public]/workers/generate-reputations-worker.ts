import { Server } from 'interfaces/models/game/server';
import { PlayerFaction } from 'interfaces/models/game/player';
import { Reputation } from 'interfaces/models/game/reputation';
import { reputationFactory } from 'app/factories/reputation-factory';
import { database } from 'database/database';

export type GenerateReputationsWorkerPayload = {
  server: Server;
};

export type GenerateReputationsWorkerReturn = {
  reputations: Reputation[];
};

const factions: PlayerFaction[] = ['player', 'npc1', 'npc2', 'npc3', 'npc4', 'npc5', 'npc6', 'npc7', 'npc8'];

self.addEventListener('message', async (event: MessageEvent<GenerateReputationsWorkerPayload>) => {
  const { server } = event.data;
  const reputations = factions.map((faction) =>
    reputationFactory({
      server,
      faction,
    })
  );
  self.postMessage({ reputations });
  await database.reputations.bulkAdd(reputations);
  self.close();
});
