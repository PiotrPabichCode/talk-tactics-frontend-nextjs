import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/i18n';

const Score = ({
  totalPoints,
  completedCourses,
}: {
  totalPoints: number;
  completedCourses: number;
}) => {
  const t = useTranslations('ProfilePage');
  return (
    <div
      className='flex flex-col gap-2 w-full animate-fade-up'
      style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
      <p className='text-2xl text-center font-semibold'>{t('progress')}</p>
      <Separator />
      <p className='font-medium text-center font-serif'>
        {t('pointsWithScore', { points: totalPoints })}
      </p>
      <p className='font-medium text-center font-serif'>
        {t('completed', { courses: completedCourses })}
      </p>
    </div>
  );
};

export default Score;
