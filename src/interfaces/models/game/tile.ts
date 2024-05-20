import type { Point } from 'interfaces/models/common';
import type { Player } from 'interfaces/models/game/player';
import type { Resource } from 'interfaces/models/game/resource';
import type { WithServerId } from 'interfaces/models/game/server';
import type { ResourceFieldComposition, Village } from 'interfaces/models/game/village';

export type BaseTile = WithServerId<{
  id: string;
  coordinates: Point;
  // Both backgroundColor & oasisGroup will be replaced by an actual graphic once they exist
  graphics: {
    backgroundColor: string;
  };
}>;

export type OasisResourceBonus = {
  resource: Resource;
  bonus: '25%' | '50%';
};

export type OasisTile = BaseTile & {
  type: 'oasis-tile';
  oasisResourceBonus: OasisResourceBonus[];
  graphics: {
    // Different oasis groups have different graphics
    oasisGroup: number;
    // Position in the oasisShape matrix [rowIndex, columnIndex]
    oasisGroupPosition: number[];
  };
  villageId: null;
};

export type OccupiableOasisTile = OasisTile & {
  villageId: null;
};

export type OccupiedOasisTile = Omit<OasisTile, 'villageId'> & {
  villageId: Village['id'];
};

export type OccupiableTile = BaseTile & {
  type: 'free-tile';
  resourceFieldComposition: ResourceFieldComposition;
};

export type OccupiedOccupiableTile = OccupiableTile & {
  ownedBy: Player['id'];
  treasureType: 'artifact' | 'hero-item' | 'currency' | 'resources' | null;
  villageSize: 'xs' | 'sm' | 'md' | 'lg';
};

export type Tile = OasisTile | OccupiedOasisTile | OccupiableTile | OccupiedOccupiableTile;

export type MaybeOccupiedBaseTile = BaseTile | OccupiedOccupiableTile;
export type MaybeOccupiedOrOasisBaseTile = MaybeOccupiedBaseTile | OasisTile;
export type MaybeOccupiedOrOasisOccupiableTile = OccupiableTile | OccupiedOccupiableTile | OasisTile;
export type MaybeOccupiedOccupiableTile = OccupiableTile | OccupiedOccupiableTile;
