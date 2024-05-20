import { globalQuests, villageQuests } from 'assets/quests';
import type { Quest } from 'interfaces/models/game/quest';
import type { Server } from 'interfaces/models/game/server';
import type { Village } from 'interfaces/models/game/village';

type QuestFactoryProps = {
  server: Server;
};

export const questFactory = ({ server, ...quest }: QuestFactoryProps & Omit<Quest, 'serverId'>): Quest => {
  return {
    serverId: server.id,
    ...quest,
  };
};

export const newVillageQuestsFactory = ({ server, villageId }: QuestFactoryProps & { villageId: Village['id'] }): Quest[] => {
  return villageQuests.map((quest) => questFactory({ server, villageId, ...quest }));
};

export const globalQuestsFactory = ({ server }: QuestFactoryProps): Quest[] => {
  return globalQuests.map((quest) => questFactory({ server, ...quest }));
};
