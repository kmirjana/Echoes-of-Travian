import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { ExitPage } from 'app/[game]/components/ExitPage';
import { gameLoader } from 'app/[game]/loader';
import { AppLayout } from 'app/layout';

import React, { lazy } from 'react';

const PublicLayout = lazy(async () => ({ default: (await import('app/[public]/layout')).PublicLayout }));
const HomePage = lazy(async () => ({ default: (await import('app/[public]/[index]/page')).HomePage }));
const VillagePage = lazy(async () => ({ default: (await import('app/[game]/[village]/page')).VillagePage }));
const OptionsPage = lazy(async () => ({ default: (await import('app/[game]/[options]/page')).OptionsPage }));

const BuildingPage = lazy(async () => ({ default: (await import('app/[game]/[village]/[...building-field-id]/page')).BuildingPage }));
const ReportPage = lazy(async () => ({ default: (await import('app/[game]/[reports]/[...report-id]/page')).ReportPage }));
const MapPage = lazy(async () => ({ default: (await import('app/[game]/[map]/page')).MapPage }));
const ReportsPage = lazy(async () => ({ default: (await import('app/[game]/[reports]/page')).ReportsPage }));
const AuctionsPage = lazy(async () => ({ default: (await import('app/[game]/[auctions]/page')).AuctionsPage }));
const MapProvider = lazy(async () => ({ default: (await import('app/[game]/[map]/providers/map-context')).MapProvider }));
const GameLayout = lazy(async () => ({ default: (await import('app/[game]/layout')).GameLayout }));
const GameProviders = lazy(async () => ({ default: (await import('app/[game]/providers/game-providers')).GameProviders }));
const GameErrorBoundary = lazy(async () => ({ default: (await import('app/[game]/error-boundary')).GameErrorBoundary }));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      {/* Public paths */}
      <Route
        path="/"
        element={<PublicLayout />}
      >
        <Route
          index
          element={<HomePage />}
        />
      </Route>
      {/* Game paths */}
      <Route
        id="game"
        path="/game/:serverSlug/:villageSlug/"
        element={<GameProviders />}
        loader={gameLoader}
        errorElement={<GameErrorBoundary />}
      >
        <Route element={<GameLayout />}>
          <Route path="resources">
            {/* z */}
            <Route
              path="options"
              element={<OptionsPage />}
            />
            <Route
              path="exit"
              element={<ExitPage />}
            />
            <Route
              path=":buildingFieldId"
              element={<BuildingPage />}
            />
          </Route>
          <Route path="village">
            <Route
              index
              element={<VillagePage />}
            />
            <Route
              path=":buildingFieldId"
              element={<BuildingPage />}
            />
          </Route>
          <Route path="reports">
            <Route
              index
              element={<ReportsPage />}
            />
            <Route
              path=":reportId"
              element={<ReportPage />}
            />
          </Route>
          <Route
            path="auctions"
            element={<AuctionsPage />}
          />
          <Route
            path="options"
            element={<OptionsPage />}
          />
          <Route
            path="exit"
            element={<ExitPage />}
          />
          <Route
            path="map"
            element={
              <MapProvider>
                <MapPage />
              </MapProvider>
            }
          />
        </Route>
      </Route>
    </Route>
  )
);
