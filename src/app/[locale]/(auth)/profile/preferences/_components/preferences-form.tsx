'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/components/ui/use-toast';
import { useTheme } from 'next-themes';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { CheckIcon } from 'lucide-react';
import { FontType } from '@/typings/settings';
import useSettingsStore from '@/store/useSettingsStore';
import { LightMode, DarkMode } from '.';
import { useTranslations } from '@/i18n';
import { usePathname, useRouter } from '@/navigation';
import { useLocale } from 'next-intl';
import { FormPopover } from '@/components/form/form-popover';

const languages = [
  { label: 'English', value: 'en' },
  { label: 'Polski', value: 'pl' },
] as const;

const fonts = [
  { label: 'Inter', value: 'inter' },
  { label: 'Manrope', value: 'manrope' },
  { label: 'Montserrat', value: 'montserrat' },
];

const preferencesFormSchema = z.object({
  theme: z.enum(['light', 'dark'], {
    required_error: 'Please select a theme.',
  }),
  font: z.string({
    required_error: 'Please select a font.',
  }),
  language: z.string({
    required_error: 'Please select a language.',
  }),
});

type PreferencesFormSchema = z.infer<typeof preferencesFormSchema>;

export function PreferencesForm() {
  const t = useTranslations('UserProfile.Preferences');
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const { setTheme, theme } = useTheme();
  const { font, changeFont } = useSettingsStore();
  const defaultValues: Partial<PreferencesFormSchema> = {
    theme: theme as 'light' | 'dark',
    language: locale,
    font: font as FontType,
  };

  const form = useForm<PreferencesFormSchema>({
    resolver: zodResolver(preferencesFormSchema),
    defaultValues,
  });

  function onSubmit(data: PreferencesFormSchema) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        {/* <FormPopover
          control={form.control}
          name='language'
          label={t('language')}
          searchPlaceholder={t('selectLanguage')}
          emptyMessage={t('noLanguageFound')}
          values={languages}
          onSelect={(val) => {
            form.setValue('language', val);
            router.replace(pathname, {
              locale: val,
              scroll: false,
            });
          }}
        /> */}
        <FormField
          control={form.control}
          name='language'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>{t('language')}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      role='combobox'
                      className={cn(
                        'w-[200px] justify-between',
                        !field.value && 'text-muted-foreground'
                      )}>
                      {field.value
                        ? languages.find(
                            (language) => language.value === field.value
                          )?.label
                        : t('selectLanguage')}
                      <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-[200px] p-0'>
                  <Command>
                    <CommandInput placeholder={t('searchLanguage')} />
                    <CommandEmpty>{t('noLanguageFound')}</CommandEmpty>
                    <CommandGroup>
                      <CommandList>
                        {languages.map((language) => (
                          <CommandItem
                            value={language.label}
                            key={language.value}
                            onSelect={() => {
                              form.setValue('language', language.value);
                              router.replace(pathname, {
                                locale: language.value,
                                scroll: false,
                              });
                            }}>
                            <CheckIcon
                              className={cn(
                                'mr-2 h-4 w-4',
                                language.value === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {language.label}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>{t('languageDescription')}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='font'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>{t('font')}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      role='combobox'
                      className={cn(
                        'w-[200px] justify-between',
                        !field.value && 'text-muted-foreground'
                      )}>
                      {field.value
                        ? fonts.find((font) => font.value === field.value)
                            ?.label
                        : t('selectFont')}
                      <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-[200px] p-0'>
                  <Command>
                    <CommandInput placeholder={t('searchFont')} />
                    <CommandEmpty>{t('noFontFound')}</CommandEmpty>
                    <CommandGroup>
                      <CommandList>
                        {fonts.map((font) => (
                          <CommandItem
                            value={font.label}
                            key={font.value}
                            onSelect={() => {
                              form.setValue('font', font.value as FontType);
                              changeFont(font.value as FontType);
                            }}>
                            <CheckIcon
                              className={cn(
                                'mr-2 h-4 w-4',
                                font.value === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {font.label}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>{t('fontDescription')}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name='theme'
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>{t('theme')}</FormLabel>
              <FormDescription>{t('themeDescription')}</FormDescription>
              <FormMessage />
              <RadioGroup
                onValueChange={(val) => {
                  setTheme(val);
                }}
                defaultValue={field.value}
                className='grid max-w-md grid-cols-2 gap-8 pt-2'>
                <FormItem>
                  <FormLabel className='[&:has([data-state=checked])>div]:border-primary'>
                    <FormControl>
                      <RadioGroupItem value='light' className='sr-only' />
                    </FormControl>
                    <LightMode />
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className='[&:has([data-state=checked])>div]:border-primary'>
                    <FormControl>
                      <RadioGroupItem value='dark' className='sr-only' />
                    </FormControl>
                    <DarkMode />
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />

        {/* <Button type='submit'>{t('buttonSubmit')}</Button> */}
      </form>
    </Form>
  );
}
