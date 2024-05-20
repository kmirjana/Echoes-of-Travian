import { isOasisTile, isOccupiableTile, isOccupiedOasisTile, isOccupiedOccupiableTile } from 'app/[game]/utils/guards/map-guards';
import { mapFactory } from 'app/factories/map-factory';
import type { Tile } from 'interfaces/models/game/tile';
import { playersMock } from 'mocks/models/game/player-mock';
import { serverMock } from 'mocks/models/game/server-mock';
import { describe, expect } from 'vitest';

// TODO: Add test to make sure player village always exists

describe('Map factory', () => {
  const tiles = mapFactory({
    server: serverMock,
    players: playersMock,
  });

  const occupiableTiles = tiles.filter(isOccupiableTile);
  const occupiedOccupiableTiles = tiles.filter(isOccupiedOccupiableTile);
  const oasisTiles = tiles.filter(isOasisTile);
  const occupiedOasisTiles = tiles.filter(isOccupiedOasisTile);

  describe('Grid generation', () => {
    test('Creates an array of correct size', () => {
      expect(tiles.length).toBe(10201);
    });
    describe('Each tile contains required properties', () => {
      test('serverId, equal to server.id', () => {
        expect(tiles.every((tile: Tile) => Object.hasOwn(tile, 'serverId') && tile.serverId === serverMock.id)).toBe(true);
      });
      test('coordinates', () => {
        expect(tiles.every((tile: Tile) => Object.hasOwn(tile, 'coordinates'))).toBe(true);
      });
      test('type', () => {
        expect(tiles.every((tile: Tile) => Object.hasOwn(tile, 'type'))).toBe(true);
      });
      test('All tiles are either oasis or free tile', () => {
        expect(oasisTiles.length + occupiableTiles.length).toBe(tiles.length);
      });
    });
  });

  describe('Oasis resource bonus', () => {
    test('Some oasis tile have no bonus', () => {
      expect(oasisTiles.some(({ oasisResourceBonus }) => oasisResourceBonus.length === 0)).toBe(true);
    });

    test('Some oasis tile have only 25% single-resource bonus', () => {
      expect(
        oasisTiles.some(({ oasisResourceBonus }) => {
          if (oasisResourceBonus.length !== 1) {
            return false;
          }
          const { bonus } = oasisResourceBonus[0];
          return bonus === '25%';
        })
      ).toBe(true);
    });

    test('Some oasis tile have 50% single-resource bonus', () => {
      expect(
        oasisTiles.some(({ oasisResourceBonus }) => {
          if (oasisResourceBonus.length !== 1) {
            return false;
          }
          const { bonus } = oasisResourceBonus[0];
          return bonus === '50%';
        })
      ).toBe(true);
    });

    test('Some oasis tile have double 25% single-resource bonus', () => {
      expect(
        oasisTiles.some(({ oasisResourceBonus }) => {
          if (oasisResourceBonus.length !== 2) {
            return false;
          }
          const [firstBonus, secondBonus] = oasisResourceBonus;
          return firstBonus.bonus === '25%' && secondBonus.bonus === '25%';
        })
      ).toBe(true);
    });
  });

  describe('Npc oasis', () => {
    test('Some oasis are occupied by npc players', () => {
      expect(occupiedOasisTiles.length > 0).toBe(true);
    });

    test('No oasis is occupied by villages of size "xs"', () => {
      const extraSmallVillageTileIds = occupiedOccupiableTiles.filter(({ villageSize }) => villageSize === 'xs').map(({ id }) => id);
      const occupiedOasisVillageIds = occupiedOasisTiles.map(({ villageId }) => villageId);

      const listOfOccurrences = extraSmallVillageTileIds.map((id) => occupiedOasisVillageIds.filter((villageId) => villageId === id));
      expect(listOfOccurrences.every((occurrence) => occurrence.length === 0)).toBe(true);
    });

    // We're counting how many times occupying tile id appears in list of occupied oasis ids
    test('No more than 1 oasis per village is occupied by villages of size "sm"', () => {
      const smallVillageTileIds = occupiedOccupiableTiles.filter(({ villageSize }) => villageSize === 'sm').map(({ id }) => id);
      const occupiedOasisVillageIds = occupiedOasisTiles.map(({ villageId }) => villageId);

      const listOfOccurrences = smallVillageTileIds.map((id) => occupiedOasisVillageIds.filter((villageId) => villageId === id));
      expect(listOfOccurrences.every((occurrence) => occurrence.length <= 1)).toBe(true);
    });

    test('No more than 2 oasis per village is occupied by villages of size "md"', () => {
      const mediumVillageTileIds = occupiedOccupiableTiles.filter(({ villageSize }) => villageSize === 'md').map(({ id }) => id);
      const occupiedOasisVillageIds = occupiedOasisTiles.map(({ villageId }) => villageId);

      const listOfOccurrences = mediumVillageTileIds.map((id) => occupiedOasisVillageIds.filter((villageId) => villageId === id));
      expect(listOfOccurrences.every((occurrence) => occurrence.length <= 2)).toBe(true);
    });

    test('No more than 3 oasis per village is occupied by villages of size "lg"', () => {
      const largeVillageTileIds = occupiedOccupiableTiles.filter(({ villageSize }) => villageSize === 'md').map(({ id }) => id);
      const occupiedOasisVillageIds = occupiedOasisTiles.map(({ villageId }) => villageId);

      const listOfOccurrences = largeVillageTileIds.map((id) => occupiedOasisVillageIds.filter((villageId) => villageId === id));
      expect(listOfOccurrences.every((occurrence) => occurrence.length <= 3)).toBe(true);
    });
  });

  // describe('Tile type occurrence', () => {});

  //
  // TODO: Re-enable this test once nice percentages are defined
  // describe('oasis', () => {
  //   test('Approximately 40% of all fields are oasis', () => {
  //     expectToBeCloseTo(oasis.length, 40);
  //   });
  // });
  //
  // describe('normal fields', () => {
  //   test('Approximately 60% of all fields are normal fields', () => {
  //     expectToBeCloseTo(normalFields.length, 60);
  //   });
  //   test('Approximately 20% of fields are "4446" fields', () => {
  //     const fields4446 = normalFields.filter((tile: Tile) => tile.type === '4446');
  //     expectToBeCloseTo(fields4446.length, 20);
  //   });
  //   test('Approximately 32% of fields are "3456", "4356", "3546", "4536", "5346" or "5436" fields', () => {
  //     const fieldsWith5 = normalFields.filter((tile: Tile) => tile.type?.includes('5') && tile.type !== '11115');
  //     expectToBeCloseTo(fieldsWith5.length, 32);
  //   });
  //   test('Approximately 5% of fields are "4437", "4347" or "3447" fields', () => {
  //     const fieldsWith7 = normalFields.filter((tile: Tile) => tile.type?.includes('7'));
  //     expectToBeCloseTo(fieldsWith7.length, 5);
  //   });
  //   test('Approximately 1% of fields are "3339", "11115" or "00018" fields', () => {
  //     const cropperFields = normalFields.filter((tile: Tile) => ['3339', '11115', '00018'].includes(tile.type!));
  //     expectToBeCloseTo(cropperFields.length, 1);
  //   });
  // });
});
