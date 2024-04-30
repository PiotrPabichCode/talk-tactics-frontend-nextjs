import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { locales } from './config';
import {
  useTranslations as NextIntlTranslations,
  useMessages as NextIntlMessages,
  NamespaceKeys,
  NestedKeyOf,
} from 'next-intl';
import { FlagComponent } from 'country-flag-icons/react/3x2';
import { PL, US } from 'country-flag-icons/react/3x2';
import { get } from 'lodash';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (
      await (locale === 'en'
        ? // When using Turbopack, this will enable HMR for `en`
          import('../messages/en.json')
        : import(`../messages/${locale}.json`))
    ).default,
  };
});

export function useTranslations(
  key?: NamespaceKeys<IntlMessages, NestedKeyOf<IntlMessages>>
) {
  return NextIntlTranslations(key);
}

export const useMessages = () => {
  return NextIntlMessages();
};

export const GetLocalizedMessage = (key: string): string => {
  const messages = useMessages();
  return (get(messages, key) ?? key) as string;
};

type LocaleOptions = {
  label: string;
  icon: FlagComponent;
  value: string;
}[];

export const supportedLocales: LocaleOptions = [
  {
    label: 'Polski',
    icon: PL,
    value: 'pl',
  },
  {
    label: 'English',
    icon: US,
    value: 'en',
  },
] as const;
