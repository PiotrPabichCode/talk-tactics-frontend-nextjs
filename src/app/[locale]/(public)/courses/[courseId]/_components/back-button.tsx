import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Undo2 } from 'lucide-react';
import { useTranslations } from '@/i18n';

const BackButton = () => {
  const t = useTranslations('Table');

  return (
    <Link href={'/courses'} className='ml-auto'>
      <Button
        aria-label={t('DataTableToolbar.backToCourses')}
        variant='action'
        size='sm'
        className='ml-auto hidden h-7 gap-2 lg:flex'>
        <Undo2 className='size-4' />
        {t('DataTableToolbar.backToCourses')}
      </Button>
    </Link>
  );
};

export default BackButton;
