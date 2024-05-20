import { QueryClient } from '@tanstack/react-query';
import { render, renderHook } from '@testing-library/react';
import { StateProvider } from 'app/providers/state-provider';
import { ViewportProvider } from 'app/providers/viewport-context';
import { composeComponents } from 'app/utils/jsx';
import { createGameEnvironment } from 'mocks/game/game-environment';
import { serverMock } from 'mocks/models/game/server-mock';
import type React from 'react';
import type { FCWithChildren } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

export type RenderOptions = {
  path?: string;
  queryClient?: QueryClient;
  // Wrap your component with layout(s). If property is missing, default layout will be used.
  wrapper?: FCWithChildren[] | FCWithChildren;
  deviceSize?: {
    height: Window['innerHeight'];
    width: Window['innerWidth'];
  };
};

// Game components relly on url pathname params to determine correct data to display, so this testing environments mocks that. You're also provided
// a default set of game data in form of 'gameEnvironment', which you may override by providing your own query client.
const GameTestingEnvironment: FCWithChildren<RenderOptions> = (props) => {
  const { wrapper = [], deviceSize, children, queryClient: providedQueryClient } = props;

  const queryClient = createGameEnvironment();

  // Overwrite data in game env client
  if (providedQueryClient) {
    const queries = providedQueryClient.getQueryCache().getAll();
    for (const { queryKey } of queries) {
      queryClient.setQueryData(queryKey, providedQueryClient.getQueryData(queryKey));
    }
  }

  return (
    <StateProvider queryClient={queryClient}>
      <ViewportProvider initialSize={deviceSize}>
        <MemoryRouter initialEntries={[`/game/${serverMock.slug}/v-1/`]}>
          <Routes>
            <Route
              id="game"
              path="/game/:serverSlug/:villageSlug/"
              element={composeComponents(children, Array.isArray(wrapper) ? wrapper : [wrapper])}
            />
          </Routes>
        </MemoryRouter>
      </ViewportProvider>
    </StateProvider>
  );
};

const TestingEnvironment: FCWithChildren<RenderOptions> = (props) => {
  const { wrapper = [], deviceSize, children, queryClient: providedQueryClient } = props;

  const queryClient = providedQueryClient ?? new QueryClient();

  return (
    <StateProvider queryClient={queryClient}>
      <ViewportProvider initialSize={deviceSize}>
        {composeComponents(children, Array.isArray(wrapper) ? wrapper : [wrapper])}
      </ViewportProvider>
    </StateProvider>
  );
};

const defaultOptions: RenderOptions = {
  wrapper: [],
  deviceSize: {
    height: 0,
    width: 0,
  },
};

export const renderHookWithContext = <TProps, TResult>(callback: (props: TProps) => TResult, options?: RenderOptions) => {
  return renderHook(callback, {
    wrapper: ({ children }) => <TestingEnvironment {...{ ...defaultOptions, ...options }}>{children}</TestingEnvironment>,
  });
};

export const renderWithContext = <T = HTMLElement>(
  ui: React.ReactElement<T, string | React.JSXElementConstructor<T>>,
  options?: RenderOptions
) => {
  return render(ui, {
    wrapper: ({ children }) => <TestingEnvironment {...{ ...defaultOptions, ...options }}>{children}</TestingEnvironment>,
  });
};

export const renderWithGameContext = <T = HTMLElement>(
  ui: React.ReactElement<T, string | React.JSXElementConstructor<T>>,
  options?: RenderOptions
) => {
  return render(ui, {
    wrapper: ({ children }) => <GameTestingEnvironment {...{ ...defaultOptions, ...options }}>{children}</GameTestingEnvironment>,
  });
};

export const renderHookWithGameContext = <TProps, TResult>(callback: (props: TProps) => TResult, options?: RenderOptions) => {
  return renderHook(callback, {
    wrapper: ({ children }) => <GameTestingEnvironment {...{ ...defaultOptions, ...options }}>{children}</GameTestingEnvironment>,
  });
};
