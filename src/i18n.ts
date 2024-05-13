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
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

export const useTranslations: typeof NextIntlTranslations =
  NextIntlTranslations;

export type Messages = NestedKeyOf<IntlMessages>;

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
