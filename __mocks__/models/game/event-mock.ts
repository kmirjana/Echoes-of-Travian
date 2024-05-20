import { getBuildingData } from 'app/[game]/utils/common';
import { type GameEvent, GameEventType } from 'interfaces/models/events/game-event';
import { serverMock } from 'mocks/models/game/server-mock';
import { villageMock } from 'mocks/models/game/village/village-mock';

const cranny = getBuildingData('CRANNY');

export const buildingConstructionEventMock: GameEvent<GameEventType.BUILDING_CONSTRUCTION> = {
  id: 'id',
  type: GameEventType.BUILDING_CONSTRUCTION,
  resolvesAt: Date.now(),
  villageId: villageMock.id,
  serverId: serverMock.id,
  building: cranny,
  buildingFieldId: 38,
  resourceCost: cranny.buildingCost[0],
};
