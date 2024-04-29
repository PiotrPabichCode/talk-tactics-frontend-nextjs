import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Providers } from './provider';
import { Toaster } from 'sonner';
import { locales } from '@/config';
import { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import { NextIntlClientProvider, useMessages } from 'next-intl';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: Omit<Props, 'children'>) {
  const t = await getTranslations({ locale, namespace: 'LocaleLayout' });

  return {
    title: t('title'),
  };
}

export default function LocaleLayout({ children, params: { locale } }: Props) {
  const messages = useMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Providers>
          <Toaster duration={3000} position='top-center' visibleToasts={3} />
          <Header />
          <div className='flex-grow pt-20'>{children}</div>
          <Footer />
        </Providers>
      </NextIntlClientProvider>
    </html>
  );
}
