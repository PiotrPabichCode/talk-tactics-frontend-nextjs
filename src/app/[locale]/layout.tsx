import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Providers } from './provider';
import { locales } from '@/config';
import { ReactNode, use } from 'react';
import { getTranslations } from 'next-intl/server';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: Omit<Props, 'children'>) {
  const params = await props.params;
  const locale = params.locale;
  const t = await getTranslations({ locale, namespace: 'LocaleLayout' });

  return {
    title: t('title'),
  };
}

export default function LocaleLayout(props: Props) {
  const { children } = props;
  const { locale } = use(props.params);
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className='flex flex-col min-h-screen'>
        <Providers locale={locale}>
          <Header />
          <div className='flex-grow pt-20'>{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
