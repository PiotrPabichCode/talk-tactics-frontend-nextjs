import { useTranslations } from '@/i18n';
import useUserStore from '@/store/useUserStore';

export function WelcomeMessage() {
  const { firstName } = useUserStore();
  const t = useTranslations('UserProfile');
  return (
    <div className='space-y-0.5'>
      <h2
        className='text-2xl font-bold tracking-tight animate-fade-up'
        style={{
          animationDelay: '0.1s',
          animationFillMode: 'both',
        }}>
        {t('welcome', {
          name: firstName,
        })}
      </h2>
      <p
        className='text-muted-foreground animate-fade-up'
        style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
        {t('description')}
      </p>
    </div>
  );
}
