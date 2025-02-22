import { Separator } from '@/components/ui/separator';
import { UserAvatar } from '@/components/user-avatar';
import Badge from './badge';

const ProfileHeader = ({
  firstName,
  lastName,
  totalPoints,
}: {
  firstName: string;
  lastName: string;
  totalPoints: number;
}) => {
  return (
    <div className='relative flex justify-center items-center w-full h-[80%] py-10 lg:pr-40'>
      <div
        className="absolute inset-0 bg-[url('/profile-bg.webp')] bg-cover bg-center bg-no-repeat brightness-50 animate-fade-in"
        style={{ animationDelay: '0.8s', animationFillMode: 'both' }}
      />
      <div className='flex flex-col lg:flex-row gap-5 items-center relative z-10'>
        <UserAvatar
          className='w-32 h-32 2xl:w-64 2xl:h-64 lg:mr-10 animate-fade-up bg-white'
          style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
        />
        <div
          className='flex flex-col gap-2 animate-fade-up'
          style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
          <h1 className='text-4xl 2xl:text-6xl font-bold text-zinc-200'>
            {firstName + ' ' + lastName}
          </h1>
          <Separator className='bg-slate-700 w-20' />
          <Badge points={totalPoints} />
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
