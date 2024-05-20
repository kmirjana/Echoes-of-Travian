import { mapFiltersFactory } from 'app/factories/map-filters-factory';
import { serverMock } from 'mocks/models/game/server-mock';

describe('Bank factory', () => {
  const mapFilters = mapFiltersFactory({ server: serverMock });

  test('Has correct server id', () => {
    expect(mapFilters.serverId).toBe(serverMock.id);
  });

  test('Has all required filters', () => {
    expect(Object.hasOwn(mapFilters, 'shouldShowFactionReputation')).toBe(true);
    expect(Object.hasOwn(mapFilters, 'shouldShowOasisIcons')).toBe(true);
    expect(Object.hasOwn(mapFilters, 'shouldShowTroopMovements')).toBe(true);
    expect(Object.hasOwn(mapFilters, 'shouldShowWheatFields')).toBe(true);
    expect(Object.hasOwn(mapFilters, 'shouldShowTileTooltips')).toBe(true);
    expect(Object.hasOwn(mapFilters, 'shouldShowTreasureIcons')).toBe(true);
  });
});
