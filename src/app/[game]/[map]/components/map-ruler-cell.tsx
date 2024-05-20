import { useMapOptions } from 'app/[game]/[map]/providers/map-context';
import clsx from 'clsx';
import type React from 'react';
import type { ListChildComponentProps } from 'react-window';

type MapRulerCellProps = {
  layout: 'vertical' | 'horizontal';
};

export const MapRulerCell: React.FC<ListChildComponentProps<MapRulerCellProps>> = ({ index, style, data: { layout } }) => {
  const { gridSize } = useMapOptions();
  const modifier = (gridSize - 1) / 2 + 1;

  const cellIndex = layout === 'vertical' ? gridSize - index - modifier : -gridSize + index + modifier;

  return (
    <span
      className={clsx(
        layout === 'vertical' ? 'border-y' : 'border-x',
        'flex items-center justify-center border-gray-400 bg-slate-800 text-xs font-medium text-white'
      )}
      style={style}
    >
      {cellIndex}
    </span>
  );
};
