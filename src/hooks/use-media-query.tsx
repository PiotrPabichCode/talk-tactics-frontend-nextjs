import React from 'react';

export function useMediaQuery(query: string): boolean {
  const subscribe = React.useCallback(
    (callback: () => void) => {
      const matchMedia = window.matchMedia(query);

      matchMedia.addEventListener('change', callback);
      return () => {
        matchMedia.removeEventListener('change', callback);
      };
    },
    [query]
  );

  const getSnapshot = (): boolean => {
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = (): never => {
    throw new Error('useMediaQuery is a client-only hook');
  };

  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
