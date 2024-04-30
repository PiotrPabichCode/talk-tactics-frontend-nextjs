'use client';

import { Separator } from '@/components/ui/separator';
import { PreferencesForm } from './preferences-form';
import { useTranslations } from '@/i18n';

export default function PreferencesPage() {
  const t = useTranslations('UserProfile.Preferences');
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>{t('title')}</h3>
        <p className='text-sm text-muted-foreground'>{t('description')}</p>
      </div>
      <Separator />
      <PreferencesForm />
    </div>
  );
}
