import React, { useState, createContext, useContext, useEffect, useMemo, FunctionComponentWithChildren } from 'react';

type WindowSize = {
  height: number;
  width: number;
};

type ViewportContextValues = {
  isWiderThanXs: boolean;
  isWiderThanSm: boolean;
  isWiderThanMd: boolean;
  isWiderThanLg: boolean;
  isWiderThanXl: boolean;
  isWiderThan2Xl: boolean;
} & WindowSize;

export const breakpoints = {
  xs: 425,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

const ViewportContext = createContext<ViewportContextValues>({} as never);

const ViewportProvider: FunctionComponentWithChildren = ({ children }) => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    height: 0,
    width: 0
  });

  const { width, height } = windowSize;

  const isWiderThanXs: boolean = width >= breakpoints.xs;
  const isWiderThanSm: boolean = width >= breakpoints.sm;
  const isWiderThanMd: boolean = width >= breakpoints.md;
  const isWiderThanLg: boolean = width >= breakpoints.lg;
  const isWiderThanXl: boolean = width >= breakpoints.xl;
  const isWiderThan2Xl: boolean = width >= breakpoints['2xl'];

  // TODO: Add debounce, maybe through lodash, don't wanna maintain own version
  useEffect(() => {
    const debouncedHandleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    debouncedHandleResize();
    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize);
  }, []);

  const value = useMemo<ViewportContextValues>(() => {
    return {
      width,
      height,
      isWiderThanXs,
      isWiderThanSm,
      isWiderThanMd,
      isWiderThanLg,
      isWiderThanXl,
      isWiderThan2Xl,
    };
  }, [windowSize]);

  return <ViewportContext.Provider value={value}>{children}</ViewportContext.Provider>;
};

const useViewport = () => useContext(ViewportContext);

export { ViewportProvider, useViewport };
