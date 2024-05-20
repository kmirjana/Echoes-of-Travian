import type { WithServerId } from 'interfaces/models/game/server';
import type { Tile } from 'interfaces/models/game/tile';

export type ReportTypes =
  | 'attack'
  | 'defence'
  | 'scout-attack'
  | 'scout-defence'
  | 'adventure'
  | 'trade'
  | 'quest'
  | 'reinforcements-sent'
  | 'reinforcements-received';

export type ReportTag = 'read' | 'archived' | 'deleted';

export type ReportStatus = 'no-loss' | 'some-loss' | 'full-loss';

export type Report = WithServerId<{
  id: number;
  type: ReportTypes;
  tags: ReportTag[];
  tileId: Tile['id'];
  timestamp: Date;
  status?: ReportStatus;
}>;
