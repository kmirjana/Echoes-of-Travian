import { useGameNavigation } from 'app/[game]/hooks/routes/use-game-navigation';
import { useCurrentResources } from 'app/[game]/hooks/use-current-resources';
import { useCurrentVillage } from 'app/[game]/hooks/use-current-village';
import { GameLayoutSkeleton } from 'app/[game]/skeleton';
import { Icon } from 'app/components/icon';
import { useViewport } from 'app/providers/viewport-context';
import { formatNumberWithCommas } from 'app/utils/common';
import clsx from 'clsx';
import type { Resource } from 'interfaces/models/game/resource';
import type React from 'react';
import { Suspense, useState } from 'react';
import { GiWheat } from 'react-icons/gi';
import { GrResources } from 'react-icons/gr';
import { LuScrollText } from 'react-icons/lu';
import { MdOutlineHolidayVillage } from 'react-icons/md';
import { RiAuctionLine } from 'react-icons/ri';
import { Await, Link, Outlet, useRouteLoaderData } from 'react-router-dom';
import { IoExit } from 'react-icons/io5';
import { IoMdOptions } from 'react-icons/io';

import { OptionsModal } from 'app/components/OptionsModal';

import { CloseButton } from 'app/components/buttons/close-button';
import { useNavbarContext } from 'app/providers/navbar-context';
import { FaTwitter } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa6';
import ThemeToggle from 'app/components/theme-toggle';

type ResourceCounterProps = {
  resource: Resource;
};

const ResourceCounter: React.FC<ResourceCounterProps> = ({ resource }) => {
  const { calculatedResourceAmount, hourlyProduction, storageCapacity, isFull, hasNegativeProduction } = useCurrentResources(resource);

  const storagePercentage = (calculatedResourceAmount / storageCapacity) * 100;
  const storageIcon = resource === 'wheat' ? 'granaryCapacity' : 'warehouseCapacity';

  return (
    <div className="flex w-full items-center gap-2 lg:rounded-md lg:border-2 lg:border-stone-400 lg:bg-stone-100 lg:px-1 lg:pb-1">
      <Icon
        className="hidden size-8 lg:flex"
        type={resource}
      />
      <div className="flex w-full flex-col">
        <div className="flex w-full items-center justify-between lg:justify-end">
          <Icon
            className="size-4 lg:hidden"
            type={resource}
          />
          <div className="flex">
            <span className="text-xxs font-medium text-white lg:text-sm lg:text-black">
              {formatNumberWithCommas(calculatedResourceAmount)}
            </span>
            <span className="text-xxs hidden font-normal text-white lg:flex lg:text-sm lg:text-black">
              /{formatNumberWithCommas(storageCapacity)}
            </span>
          </div>
        </div>
        <div className="relative mt-px flex h-2 w-full rounded-sm border border-black/60 bg-white lg:h-3">
          <div
            className={clsx(isFull || hasNegativeProduction ? 'bg-red-600' : 'bg-green-500', 'flex h-full rounded-sm')}
            style={{
              width: `${storagePercentage}%`,
            }}
          />
        </div>
        <div className="flex w-full items-center justify-between lg:hidden">
          <span className="text-xxs font-medium text-white">/h</span>
          <span className="text-xxs font-medium text-white">{hourlyProduction}</span>
        </div>
        <div className="flex w-full items-center justify-between lg:hidden">
          <Icon
            className="size-4"
            type={storageIcon}
          />
          <span className="text-xxs font-medium text-white">{formatNumberWithCommas(storageCapacity)}</span>
        </div>
      </div>
    </div>
  );
};

export const DesktopNavigation = () => {
  const { villagePath, reportsPath, mapPath, resourcesPath, auctionsPath } = useGameNavigation();
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };
  const handleOpen = () => {
    setShowModal(true);
  };
  const data = useNavbarContext();
  console.log(data);
  return (
    <header className="fixed left-0 top-0 z-10 flex h-24 w-full">
      <div className="absolute z-[-1] h-10 w-full bg-[#73645a]" />

      <div className="container space-x-9 flex mx-auto justify-between">
        <div className="w-28 h-16 bg-[#dbceba]  mt-2 flex rounded-lg " />
        <div className="flex flex-4">
          <div className="relative flex-grow flex-1 bg-[#A59380] mt-3 mr-5 pl-10 rounded-lg">
            <div
              className="absolute flex w-24 max-h-24 md:w-20 md:h-20  mt-2 bg-[#dbceba] border-[#decdb1] rounded-full"
              style={{ left: '-45px' }}
            />

            <div className="flex w-full flex-col  md:px-1">
              <div className="flex w-full flex-[2] justify-between">
                <div className="flex flex-1 items-center justify-center">
                  <Link to={resourcesPath}>
                    <GiWheat className="text-2xl text-white" />
                  </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                  <Link to={villagePath}>
                    <MdOutlineHolidayVillage className="text-2xl text-white" />
                  </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                  <Link to={mapPath}>
                    <GrResources className="text-2xl text-white" />
                  </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                  <Link to={reportsPath}>
                    <LuScrollText className="text-2xl text-white" />
                  </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                  <Link to={auctionsPath}>
                    <RiAuctionLine className="text-2xl text-white" />
                  </Link>
                </div>
              </div>
              <div className="flex flex-1 gap-1">
                {(['wood', 'clay', 'iron', 'wheat'] as Resource[]).map((resource: Resource) => (
                  <div
                    key={resource}
                    className="flex flex-1"
                  >
                    <ResourceCounter resource={resource} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-2 space-x-4 justify-end text-gray-600">
          <Link to="resources/:modal">
            <IoMdOptions
              className="min-w-10 h-10 md:min-w-8 md:h-8 bg-[#d1d1d1] ml-2 md:mt-1 rounded-full p-2 cursor-pointer"
              onClick={handleOpen}
            />
          </Link>

          {showModal ? (
            <OptionsModal>
              <div className="grid grid-cols-2 ">
                <h2 className="text-lg font-medium ">Preferences</h2>
                <CloseButton
                  className="text-[#D3BEA2]"
                  onClick={handleClose}
                />
              </div>
              <div className="mt-2 text-md grid grid-cols-3 grid-rows-1">
                <div className="ul cursor-pointer">
                  <FaTwitter />
                </div>
                <div className="ul">
                  <FaGithub />
                </div>
                <div className="ul">
                  <ThemeToggle />
                </div>
              </div>
            </OptionsModal>
          ) : null}

          <Link to="/">
            <IoExit className=" exit min-w-10 h-10 md:min-w-8 md:h-8 md:mt-1 bg-[#d1d1d1] ml-2 rounded-full p-2 cursor-pointer" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export const MobileResourcesSection = () => {
  const { population } = useCurrentVillage();

  return (
    <div className="flex w-full bg-blue-500 bg-gradient-to-b from-[#101010] to-[#484848]">
      {(['wood', 'clay', 'iron', 'wheat'] as Resource[]).map((resource: Resource, index) => (
        <div
          key={resource}
          className={clsx(index !== 3 && 'border-r border-gray-600', 'flex flex-1  px-1')}
        >
          <ResourceCounter resource={resource} />
        </div>
      ))}
      <div className="flex flex-1 flex-col gap-1 border-r border-gray-600 px-1">
        <div className="flex w-full items-center justify-between">
          <Icon
            className="size-4"
            type="freeCrop"
          />
          <span className="text-xxs font-medium text-white">{formatNumberWithCommas(1334)}</span>
        </div>
        <div className="flex w-full items-center justify-between">
          <Icon
            className="size-4"
            type="populationCropConsumption"
          />
          <span className="text-xxs font-medium text-white">{formatNumberWithCommas(population)}</span>
        </div>
        <div className="flex w-full items-center justify-between">
          <Icon
            className="size-4"
            type="troopsCropConsumption"
          />
          <span className="text-xxs font-medium text-white">{formatNumberWithCommas(1724)}</span>
        </div>
      </div>
    </div>
  );
};

export const MobileBottomNavigation = () => {
  const { villagePath, reportsPath, mapPath, resourcesPath, auctionsPath } = useGameNavigation();

  return (
    <header className="fixed bottom-0 left-0 flex h-12 w-full justify-between gap-2 bg-gradient-to-t from-[#101010] to-[#484848]">
      <div className="flex flex-1 items-center justify-center">
        <Link to={resourcesPath}>
          <GiWheat className="text-2xl text-white" />
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <Link to={villagePath}>
          <MdOutlineHolidayVillage className="text-2xl text-white" />
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <Link to={mapPath}>
          <GrResources className="text-2xl text-white" />
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <Link to={reportsPath}>
          <LuScrollText className="text-2xl text-white" />
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <Link to={auctionsPath}>
          <RiAuctionLine className="text-2xl text-white" />
        </Link>
      </div>
    </header>
  );
};

type RouteLoaderData = {
  resolved: boolean;
};

export const GameLayout = () => {
  const { resolved } = useRouteLoaderData('game') as RouteLoaderData;
  const { isWiderThanMd } = useViewport();
  const { isMapPageOpen } = useGameNavigation();

  const shouldDisplayDesktopNavigation = isWiderThanMd;
  const shouldDisplayMobileResourcesSection = !isWiderThanMd && !isMapPageOpen;
  const shouldDisplayMobileBottomNavigation = !isWiderThanMd;

  // useEffect(() => {
  //   if (!resolved) {
  //     return;
  //   }
  //
  //   updateLastLoggedIn({ server });
  //
  //   const intervalId = window.setInterval(() => {
  //     updateLastLoggedIn({ server });
  //   }, 60000);
  //
  //   return () => window.clearInterval(intervalId);
  // }, [resolved, server, updateLastLoggedIn]);

  return (
    <Suspense fallback={<GameLayoutSkeleton />}>
      <Await resolve={resolved}>
        {shouldDisplayDesktopNavigation && <DesktopNavigation />}
        {shouldDisplayMobileResourcesSection && <MobileResourcesSection />}
        <Outlet />
        {shouldDisplayMobileBottomNavigation && <MobileBottomNavigation />}
      </Await>
    </Suspense>
  );
};
