import { Tile } from 'interfaces/models/game/tile';
import { Server } from 'interfaces/models/game/server';
import { newVillage } from 'constants/new-village';
import { database } from 'database/database';

export class CreateServerService {
  public readonly serverId: Server['id'];

  public readonly server: Server;

  constructor(server: Server) {
    this.server = server;
    this.serverId = server.id;
  }

  public createPlayerVillageData = async (): Promise<void> => {
    const defaultVillage = newVillage;
    // await StorageService.set<Village[]>(`${this.serverId}-playerVillages`, [defaultVillage]);
  };

  public createEventQueue = async (): Promise<void> => {
    //  await StorageService.set(`${this.serverId}-events`, []);
  };

  public createHero = async (): Promise<void> => {
    const { tribe } = this.server.configuration;
    const speed = tribe === 'gauls' ? 14 : 9;
    const attackPower = tribe === 'romans' ? 100 : 80;

    const hero = {
      name: 'Unnamed hero',
      level: 0,
      experience: 0,
      health: 100,
      healthRegenerationRate: 10,
      speed,
      attackPower,
      resourceProduction: 4,
      resourceToProduce: 'shared',
      attackBonus: 0,
      defenceBonus: 0,
      unitType: 'infantry',
      wornItems: [],
      inventory: []
    };

    // await StorageService.set(`${this.serverId}-hero`, <Hero>hero);
  };

  public createQuests = async (): Promise<void> => {
    console.log('createQuests');
  };

  public createAchievements = async (): Promise<void> => {
    console.log('createAchievements');
  };

  public createResearchLevels = async (): Promise<void> => {
    console.log('createResearchLevels');
  };

  public createAccountEffects = async (): Promise<void> => {
    // await StorageService.set(`${this.serverId}-accountEffects`, accountEffects);
  };

  public static createMapData = async (server: Server): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const createNewServerWorker = new Worker(new URL('../workers/generate-world-map-worker', import.meta.url), {
        type: 'module'
      });
      createNewServerWorker.postMessage([server]);
      createNewServerWorker.addEventListener('message', async (event: MessageEvent<{ tiles: Tile[] }>) => {
        const { tiles } = event.data;
        await database.maps.bulkAdd(tiles);
        resolve(true);
      });
      createNewServerWorker.addEventListener('error', () => {
        reject(new Error('Error occurred when creating world data'));
      });
    });
  };
}
