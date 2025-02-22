import { Badge as UiBadge } from '@/components/ui/badge';

const getBadgeName = (points: number): string => {
  let name = '';

  if (points < 1000) {
    name = 'Word Beginner';
  } else if (points < 2000) {
    name = 'Word Novice';
  } else if (points < 3000) {
    name = 'Word Intermediate';
  } else if (points < 4000) {
    name = 'Word Advanced';
  } else if (points < 5000) {
    name = 'Word Expert';
  } else {
    name = 'Word Master';
  }

  return name;
};

const Badge = ({ points }: { points: number }) => {
  const name = getBadgeName(points);

  return (
    <div className='flex justify-center lg:justify-start'>
      <UiBadge
        variant={'secondary'}
        className='px-4 text-2xl 2xl:text-3xl text-center lg:text-start font-medium bg-slate-800 text-zinc-200 pointer-events-none'>
        {name}
      </UiBadge>
    </div>
  );
};

export default Badge;
