import { Button } from '@/components/ui/button';
import { useTranslations } from '@/i18n';
import { Link } from '@/navigation';
import { Undo2 } from 'lucide-react';

export function BackButton({ courseId }: { courseId: string }) {
  const t = useTranslations('WordPage');
  return (
    <Link
      href={`/courses/${courseId}`}
      className='animate-fade-up'
      style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
      <Button variant='action' className='absolute top-5 right-5'>
        <p className='hidden md:block md:mr-2'>{t('backToCourse')}</p>
        <Undo2 className=' h-4 w-4' />
      </Button>
    </Link>
  );
}
