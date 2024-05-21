import type { BuildingField } from 'interfaces/models/game/village';
import { useParams } from 'react-router-dom';

export const useRouteSegments = () => {
  const { serverSlug, villageSlug, buildingFieldId, reportId, optionsSlug, exitSlug } = useParams();

  return {
    serverSlug: serverSlug as string,
    villageSlug: villageSlug as string,
    buildingFieldId: buildingFieldId ? (Number(buildingFieldId) as BuildingField['id']) : null,
    reportId,
    optionsSlug: optionsSlug as string,
    exitSlug: exitSlug as string,
  };
};
