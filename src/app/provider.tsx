'use client';

import { ThemeProvider } from '@/components/theme-provider';
import { ReactQueryClientProvider } from '@/lib/react-query-client-provider';
import StoreHydration from '@/router/StoreHydration';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ReactQueryClientProvider>
      <StoreHydration />
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </ReactQueryClientProvider>
  );
}
