import type { OasisTile, OccupiableTile, OccupiedOccupiableTile, Tile } from 'interfaces/models/game/tile';
import type React from 'react';

type TileModalProps = {
  tile: Tile;
};

const _TileModalLocation: React.FC<TileModalProps> = ({ tile: _tile }) => {
  return <></>;
};

const _TileModalReports: React.FC<TileModalProps> = ({ tile: _tile }) => {
  return <></>;
};

type OasisTileModalProps = {
  tile: OasisTile;
};

const OasisTileModal: React.FC<OasisTileModalProps> = () => {
  return <></>;
};

type OccupiableTileModalProps = {
  tile: OccupiableTile;
};

const OccupiableTileModal: React.FC<OccupiableTileModalProps> = ({ tile: _tile }) => {
  return <></>;
};

type OccupiedOccupiableTileModalProps = {
  tile: OccupiedOccupiableTile;
};

const OccupiedOccupiableTileModal: React.FC<OccupiedOccupiableTileModalProps> = ({ tile: _tile }) => {
  return <></>;
};

export const _TileModal: React.FC<TileModalProps> = ({ tile }) => {
  const isOasis = tile.type === 'oasis-tile';
  const isOccupiableTile = tile.type === 'free-tile';
  const isOccupiedOccupiableTile = isOccupiableTile && Object.hasOwn(tile, 'ownedBy');

  return (
    <div className="flex flex-col gap-1">
      {isOasis && <OasisTileModal tile={tile as OasisTile} />}
      {!isOasis && (
        <>
          {isOccupiedOccupiableTile && <OccupiedOccupiableTileModal tile={tile as OccupiedOccupiableTile} />}
          {!isOccupiedOccupiableTile && <OccupiableTileModal tile={tile as OccupiableTile} />}
        </>
      )}
    </div>
  );
};
