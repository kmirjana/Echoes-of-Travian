import Dexie, { Table } from 'dexie';
import { Server } from 'interfaces/models/game/server';
import { Tile } from 'interfaces/models/game/tile';
import { Hero } from 'interfaces/models/game/hero';
import { Village } from 'interfaces/models/game/village';
import { Report } from 'interfaces/models/game/report';
import { Quest } from 'interfaces/models/game/quest';
import { Achievement } from 'interfaces/models/game/achievement';
import { GameEvent } from 'interfaces/models/events/game-event';
import { env } from 'config/env';
import { Effect } from 'interfaces/models/game/effect';
import { Bank } from 'interfaces/models/game/bank';
import { ResearchLevel } from 'interfaces/models/game/research-level';
import { CryliteTableName } from 'interfaces/models/database/crylite-table';

type TableIndex = string;

const DEFAULT_TABLE_INDEX: TableIndex[] = ['++id'];

const CRYLITE_TABLES = new Map<CryliteTableName, TableIndex[]>([
  ['servers', ['slug']],
  ['maps', ['serverId']],
  ['heroes', ['serverId']],
  ['villages', ['serverId', 'slug']],
  ['reports', ['serverId']],
  ['quests', ['serverId']],
  ['achievements', ['serverId']],
  ['events', ['serverId']],
  ['effects', ['serverId']],
  ['banks', ['serverId']],
  ['researchLevels', ['serverId']]
]);

export const CRYLITE_TABLE_NAMES = CRYLITE_TABLES.keys();

// https://dexie.org/docs/Version/Version.stores()
export class CryliteDatabase extends Dexie {
  public servers!: Table<Server>;
  public maps!: Table<Tile>;
  public heroes!: Table<Hero>;
  public villages!: Table<Village>;
  public reports!: Table<Report>;
  public quests!: Table<Quest>;
  public achievements!: Table<Achievement>;
  public events!: Table<GameEvent>;
  public effects!: Table<Effect>;
  public banks!: Table<Bank>;
  public researchLevels!: Table<ResearchLevel>;

  public amountOfTables: number;

  constructor() {
    super(env.databaseName);

    const schema = Object.fromEntries([...Array.from(CRYLITE_TABLES)
      .map(([tableName, indexes]) => [tableName, [...DEFAULT_TABLE_INDEX, ...indexes].join(', ')])]);

    this.amountOfTables = Object.keys(schema).length;

    this.version(1)
      .stores(schema);
  }
}

export const database = new CryliteDatabase();