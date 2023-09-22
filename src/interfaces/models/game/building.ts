import { Resource } from 'interfaces/models/game/resource';
import { EffectId } from 'interfaces/models/game/effect';
import { Tribe } from 'interfaces/models/game/tribe';

export type ResourceBuildingId =
  | 'CLAY_PIT'
  | 'CROPLAND'
  | 'WOODCUTTER'
  | 'IRON_MINE';

export type BuildingId =
  ResourceBuildingId
  | 'BAKERY'
  | 'BRICKYARD'
  | 'GRAIN_MILL'
  | 'GRANARY'
  | 'GREAT_GRANARY'
  | 'GREAT_WAREHOUSE'
  | 'IRON_FOUNDRY'
  | 'SAWMILL'
  | 'WAREHOUSE'
  | 'WATERWORKS'
  | 'ACADEMY'
  | 'SMITHY'
  | 'BARRACKS'
  | 'CITY_WALL'
  | 'EARTH_WALL'
  | 'GREAT_BARRACKS'
  | 'GREAT_STABLE'
  | 'HEROS_MANSION'
  | 'HOSPITAL'
  | 'MAKESHIFT_WALL'
  | 'PALISADE'
  | 'RALLY_POINT'
  | 'STABLE'
  | 'STONE_WALL'
  | 'STONEMASON'
  | 'TOURNAMENT_SQUARE'
  | 'TRAPPER'
  | 'WORKSHOP'
  | 'BREWERY'
  | 'COMMAND_CENTER'
  | 'CRANNY'
  | 'EMBASSY'
  | 'HORSE_DRINKING_TROUGH'
  | 'MAIN_BUILDING'
  | 'MARKETPLACE'
  | 'PALACE'
  | 'RESIDENCE'
  | 'TOWN_HALL'
  | 'TRADE_OFFICE'
  | 'TREASURY'
  | 'WONDER_OF_THE_WORLD';

export type BuildingEffect = {
  effectId: EffectId;
  valuesPerLevel: number[];
};

export type BuildingRequirementType = 'building' | 'tribe' | 'capital';

export type BuildingRequirement = {
  requirementType: BuildingRequirementType;
  buildingId?: Building['id'];
  level?: number;
  tribe?: Tribe;
  notBuildableInCapital?: boolean;
  onlyBuildableInCapital?: boolean;
};

export type Building = {
  id: BuildingId;
  maxLevel: number;
  buildingDuration: number[];
  culturePointsProduction: number[];
  cropConsumption: number[];
  effects?: BuildingEffect[];
  buildingRequirements?: BuildingRequirement[];
  totalResourceCost: number[];
} & Record<Resource, number[]>;