'use client';

import { ThemeProvider } from '@/components/theme-provider';
import { ReactQueryClientProvider } from '@/lib/react-query-client-provider';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ReactQueryClientProvider>
      <ThemeProvider
        attribute='class'
        defaultTheme='dark'
        enableSystem
        disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </ReactQueryClientProvider>
  );
}
