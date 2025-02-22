import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/i18n';

const ProfileBio = ({ bio }: { bio: string }) => {
  const t = useTranslations('ProfilePage');
  return (
    <div
      className='flex flex-col lg:flex-row items-center justify-center p-8 gap-4 animate-fade-up'
      style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
      <div className='flex flex-col gap-2 max-w-[400px]'>
        <p className='text-2xl text-center font-semibold'>{t('about')}</p>
        <Separator />
        <p className='font-medium text-center font-serif'>{bio}</p>
      </div>
    </div>
  );
};

export default ProfileBio;
