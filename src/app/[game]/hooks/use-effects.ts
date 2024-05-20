import { useQuery } from '@tanstack/react-query';
import { useCurrentServer } from 'app/[game]/hooks/use-current-server';
import { useCurrentVillage } from 'app/[game]/hooks/use-current-village';
import { isGlobalEffect, isServerEffect, isVillageEffect } from 'app/[game]/utils/guards/effect-guards';
import { database } from 'database/database';
import type { Effect, GlobalEffect, ServerEffect, VillageEffect } from 'interfaces/models/game/effect';
import type { Server } from 'interfaces/models/game/server';

export const effectsCacheKey = 'effects';

export const getEffects = (serverId: Server['id']) => database.effects.where({ serverId }).toArray();

export const useEffects = () => {
  const { serverId } = useCurrentServer();
  const { currentVillageId } = useCurrentVillage();

  const { data: effects } = useQuery<Effect[]>({
    queryFn: () => getEffects(serverId),
    queryKey: [effectsCacheKey, serverId],
    initialData: [],
  });

  const serverEffects: ServerEffect[] = effects.filter(isServerEffect);
  const globalEffects: GlobalEffect[] = effects.filter(isGlobalEffect);
  const villageEffects: VillageEffect[] = effects.filter(isVillageEffect);
  const currentVillageEffects: VillageEffect[] = villageEffects.filter(({ villageId }) => villageId === currentVillageId);

  return {
    effects,
    globalEffects,
    villageEffects,
    currentVillageEffects,
    serverEffects,
  };
};
