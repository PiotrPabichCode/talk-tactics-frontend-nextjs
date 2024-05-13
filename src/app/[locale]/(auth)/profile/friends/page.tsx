'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslations } from '@/i18n';
import { MessageKeys } from 'next-intl';
import { friendsTabs } from './_components/tabs';
import { Separator } from '@/components/ui/separator';

export default function FriendsPage() {
  const t = useTranslations('UserProfile.Friends');
  return (
    <Tabs
      defaultValue='friends'
      className='overflow-scroll md:overflow-visible'>
      <TabsList>
        {friendsTabs.map(({ value, label, mapper }) => (
          <TabsTrigger key={value} value={value}>
            {t(label)}
          </TabsTrigger>
        ))}
      </TabsList>
      <Separator className='mt-4 mb-3' />
      {friendsTabs.map(({ value, mapper }) => (
        <TabsContent key={value} value={value}>
          {mapper}
        </TabsContent>
      ))}
    </Tabs>
  );
}
