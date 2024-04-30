'use client';
import { Separator } from '@/components/ui/separator';
import { ProfileForm } from './profile-form';
import withAuthRoles from '@/router/withAuthRoles';
import { useTranslations } from '@/i18n';

function SettingsProfilePage() {
  const t = useTranslations('UserProfile.Settings');
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>{t('title')}</h3>
        <p className='text-sm text-muted-foreground'>{t('description')}</p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  );
}

export default withAuthRoles(SettingsProfilePage, ['ADMIN', 'USER'], 'all');
