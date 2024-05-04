import { useLocale, useTranslations } from 'next-intl';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useRouter, usePathname } from '@/navigation';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { supportedLocales } from '@/i18n';
import { Button } from './ui/button';

export default function LocaleToggle() {
  const t = useTranslations('Language');
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onChange(nextLocale: string) {
    console.log(nextLocale, pathname, params);
    // startTransition(() => {
    router.replace(pathname, { locale: nextLocale, scroll: false });
    // });
  }

  const CurrentLocale = ({ locale }: { locale: string }) => {
    const lang =
      supportedLocales.find((curr) => curr.value === locale) ??
      supportedLocales[0];
    return <lang.icon className='h-[2rem] w-[2rem]' />;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <CurrentLocale locale={locale} />
          <span className='sr-only'>{t('title')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='center'>
        {supportedLocales.map((cur) => (
          <DropdownMenuItem
            key={cur.value}
            onClick={() => onChange(cur.value)}
            disabled={isPending}>
            {cur.icon({
              title: cur.label,
              className: 'h-[2rem] w-[2rem] mr-2',
            })}
            {cur.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
