import type { Point } from 'interfaces/models/common';
import type { Building } from 'interfaces/models/game/building';
import type { Player } from 'interfaces/models/game/player';
import type { Resources } from 'interfaces/models/game/resource';
import type { Server } from 'interfaces/models/game/server';

export type ResourceFieldComposition =
  | '4446'
  | '5436'
  | '5346'
  | '4536'
  | '3546'
  | '4356'
  | '3456'
  | '4437'
  | '4347'
  | '3447'
  | '3339'
  | '11115'
  | '00018';

// Resource fields only, these are predetermined on village creation and can not be changed
export type ResourceFieldId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18;

// Player may construct any building on any of these fields
export type VillageFieldId = 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38;

// Rally point and wall are always on the same spot, these spots can't be taken by other buildings, nor can a player build anything else here
export type ReservedFieldId = 39 | 40;

export type BuildingField = {
  id: ResourceFieldId | VillageFieldId | ReservedFieldId;
  buildingId: Building['id'];
  level: number;
};

export type Village = {
  id: string;
  serverId: Server['id'];
  playerId: Player['id'];
  name: string;
  slug: string;
  lastUpdatedAt: number;
  coordinates: Point;
  resources: Resources;
  buildingFields: BuildingField[];
  isCapital: boolean;
};
