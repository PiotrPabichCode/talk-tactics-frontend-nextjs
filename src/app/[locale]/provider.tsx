import { ThemeProvider } from '@/components/theme-provider';
import { ReactQueryClientProvider } from '@/lib/react-query-client-provider';
import FontLoader from '@/router/FontLoader';
import StoreHydration from '@/router/StoreHydration';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';

export function Providers({
  children,
  locale,
}: {
  children: ReactNode;
  locale: string;
}) {
  unstable_setRequestLocale(locale); // https://github.com/vercel/next.js/discussions/58862
  const messages = useMessages();

  return (
    <StoreHydration>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ReactQueryClientProvider>
          <FontLoader />
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem
            disableTransitionOnChange>
            {children}
          </ThemeProvider>
          <Toaster duration={3000} position='top-center' visibleToasts={3} />
        </ReactQueryClientProvider>
      </NextIntlClientProvider>
    </StoreHydration>
  );
}
