import Image from 'next/image';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Leaderboard from '/public/leaderboard.webp';
import UserPage from '/public/user-page.webp';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useTranslations } from '@/i18n';

export function Friends() {
  const t = useTranslations('LandingPage');
  return (
    <div
      id='friends-modes'
      className='mt-4 animate-fade-up'
      style={{ animationDelay: '1s', animationFillMode: 'both' }}>
      <h3 className='text-center text-3xl lg:text-4xl mb-4'>{t('friends')}</h3>
      <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-4'>
        <AspectRatio ratio={2 / 1}>
          <Zoom>
            <Image
              src={Leaderboard}
              alt='Talktactics Leaderboard Page'
              className='rounded-md object-cover border-2 shadow-2xl'
            />
          </Zoom>
        </AspectRatio>
        <AspectRatio ratio={2 / 1}>
          <Zoom>
            <Image
              src={UserPage}
              alt='Talktactics User Profile Page'
              className='rounded-md object-cover border-2 shadow-2xl'
            />
          </Zoom>
        </AspectRatio>
      </div>
    </div>
  );
}
