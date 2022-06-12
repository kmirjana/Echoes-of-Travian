import { Effects } from 'interfaces/models/game/effect';

// These effects effect all villages and multiply with village-specific effects
export const accountEffects: Partial<Effects> = {
  heroSpeedBonus: 1,
  heroResourceProductionBonus: 1,
  heroStrengthBonus: 1,
  heroCarryCapacityBonus: 1,
  heroMountedUnitSpeedBonus: 1,
  barracksTrainingDuration: 1,
  greatBarracksTrainingDuration: 1,
  stableTrainingDuration: 1,
  greatStableTrainingDuration: 1,
  workshopTrainingDuration: 1,
  hospitalTrainingDuration: 1,
  unitSpeedBonus: 1,
  buildingDuration: 1,
  woodProductionBonus: 1,
  clayProductionBonus: 1,
  ironProductionBonus: 1,
  wheatProductionBonus: 1,
  cropConsumption: 1,
  culturePointsProduction: 1,
  culturePointsProductionBonus: 1,
  crannyCapacityBonus: 1,
  amountOfUnlockedUnitResearchLevels: 1
};

// These effects only apply to specific village
export const newVillageEffects: Partial<Effects> = {
  barracksTrainingDuration: 1,
  greatBarracksTrainingDuration: 1,
  stableTrainingDuration: 1,
  greatStableTrainingDuration: 1,
  workshopTrainingDuration: 1,
  hospitalTrainingDuration: 1,
  unitSpeedBonus: 1,
  unitSpeedAfter20TilesBonus: 1,
  amountOfUncoveredAttackingUnits: 1,
  villageDefenceValue: 1,
  villageDefenceBonus: 1,
  buildingDurabilityBonus: 1,
  buildingDuration: 1,
  woodProduction: 1,
  clayProduction: 1,
  ironProduction: 1,
  wheatProduction: 1,
  woodProductionBonus: 1,
  clayProductionBonus: 1,
  ironProductionBonus: 1,
  wheatProductionBonus: 1,
  oasisProductionBonus: 1,
  woodOasisProductionBonus: 1,
  clayOasisProductionBonus: 1,
  ironOasisProductionBonus: 1,
  wheatOasisProductionBonus: 1,
  oasisExpansionSlot: 1,
  cropConsumption: 1,
  culturePointsProduction: 1,
  culturePointsProductionBonus: 1,
  trapperCapacity: 1,
  crannyCapacity: 1,
  crannyCapacityBonus: 1,
  breweryAttackBonus: 1,
  embassyCapacity: 1,
  merchantAmount: 1,
  merchantCapacityBonus: 1,
  granaryCapacity: 1,
  warehouseCapacity: 1
};

const effects: Effects = {
  heroSpeedBonus: 1,
  heroResourceProductionBonus: 1,
  heroStrengthBonus: 1,
  heroCarryCapacityBonus: 1,
  heroMountedUnitSpeedBonus: 1,
  barracksTrainingDuration: 1,
  greatBarracksTrainingDuration: 1,
  stableTrainingDuration: 1,
  greatStableTrainingDuration: 1,
  workshopTrainingDuration: 1,
  hospitalTrainingDuration: 1,
  unitSpeedBonus: 1,
  unitSpeedAfter20TilesBonus: 1,
  amountOfUncoveredAttackingUnits: 1,
  amountOfUnlockedUnitResearchLevels: 1,
  villageDefenceValue: 1,
  villageDefenceBonus: 1,
  buildingDurabilityBonus: 1,
  buildingDuration: 1,
  woodProduction: 1,
  clayProduction: 1,
  ironProduction: 1,
  wheatProduction: 1,
  woodProductionBonus: 1,
  clayProductionBonus: 1,
  ironProductionBonus: 1,
  wheatProductionBonus: 1,
  oasisProductionBonus: 1,
  woodOasisProductionBonus: 1,
  clayOasisProductionBonus: 1,
  ironOasisProductionBonus: 1,
  wheatOasisProductionBonus: 1,
  oasisExpansionSlot: 1,
  cropConsumption: 1,
  culturePointsProduction: 1,
  culturePointsProductionBonus: 1,
  trapperCapacity: 1,
  crannyCapacity: 1,
  crannyCapacityBonus: 1,
  breweryAttackBonus: 1,
  embassyCapacity: 1,
  merchantAmount: 1,
  merchantCapacityBonus: 1,
  granaryCapacity: 1,
  warehouseCapacity: 1
};

export default effects;
