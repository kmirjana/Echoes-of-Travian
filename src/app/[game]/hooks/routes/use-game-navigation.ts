import { useLocation } from 'react-router-dom';

const RESOURCES_PAGE_PATH = '/resources';
const VILLAGE_PAGE_PATH = '/village';
const MAP_PAGE_PATH = '/map';
const REPORTS_PAGE_PATH = '/reports';
const AUCTIONS_PAGE_PATH = '/auctions';
const OPTIONS_PAGE_PATH = '/options';
const EXIT_PAGE_PATH = '/exit';

export const useGameNavigation = () => {
  const { pathname } = useLocation();

  const [game, server, village] = pathname.split('/');

  const basePath = `/${game}/${server}/${village}`;

  const resourcesPath = `${basePath}${RESOURCES_PAGE_PATH}`;
  const optionsPath = `${basePath}${OPTIONS_PAGE_PATH}`;
  const exitPath = `${basePath}${EXIT_PAGE_PATH}`;
  const villagePath = `${basePath}${VILLAGE_PAGE_PATH}`;
  const mapPath = `${basePath}${MAP_PAGE_PATH}`;
  const reportsPath = `${basePath}${REPORTS_PAGE_PATH}`;
  const auctionsPath = `${basePath}${AUCTIONS_PAGE_PATH}`;

  const isResourcesPageOpen = pathname.includes(RESOURCES_PAGE_PATH);
  const isOptionsPageOpen = pathname.includes(OPTIONS_PAGE_PATH);
  const isExitPageOpen = pathname.includes(EXIT_PAGE_PATH);
  const isVillagePageOpen = pathname.includes(VILLAGE_PAGE_PATH);
  const isMapPageOpen = pathname.includes(MAP_PAGE_PATH);
  const isReportsPageOpen = pathname.includes(REPORTS_PAGE_PATH);
  const isAuctionsPageOpen = pathname.includes(AUCTIONS_PAGE_PATH);

  return {
    resourcesPath,
    exitPath,
    optionsPath,
    isOptionsPageOpen,
    isExitPageOpen,
    villagePath,
    mapPath,
    reportsPath,
    auctionsPath,
    isResourcesPageOpen,
    isVillagePageOpen,
    isMapPageOpen,
    isReportsPageOpen,
    isAuctionsPageOpen,
  };
};
