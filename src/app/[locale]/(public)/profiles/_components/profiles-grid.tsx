import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FriendInvitationButton } from '@/components/friend-invitation-button';
import {
  useGetFriendList,
  useGetReceivedFriendInvitationsQuery,
  useGetSentFriendInvitationsQuery,
} from '@/services/queries/user/user.query';
import useAuthStore from '@/store/useAuthStore';
import { useTranslations } from '@/i18n';
import { Link } from '@/navigation';
import { UserAvatar } from '@/components/user-avatar';

export const ProfilesGrid = ({
  items,
  className,
}: {
  items: {
    id: string;
    title: string;
    points: number;
    description: string;
    link: string;
  }[];
  className?: string;
}) => {
  const userId = useAuthStore().credentials?.uuid!;
  const {
    data: sentFriendRequests,
    isPending: isPendingSent,
    isError: isErrorSent,
  } = useGetSentFriendInvitationsQuery(userId);
  const {
    data: receivedFriendRequests,
    isPending: isPendingReceived,
    isError: isErrorReceived,
  } = useGetReceivedFriendInvitationsQuery(userId);
  const {
    data: friends,
    isPending: isPendingFriends,
    isError: isErrorFriends,
  } = useGetFriendList(userId);
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isPending = isPendingSent || isPendingReceived || isPendingFriends;
  const isError = isErrorSent || isErrorReceived || isErrorFriends;

  if (isPending && userId) {
    return null;
  }
  if (isError && userId) {
    return 'Something went wrong';
  }

  const getFriendInvitationStatus = (
    friendId: string
  ):
    | 'SEND_INVITATION'
    | 'ACCEPT_INVITATION'
    | 'CANCEL_INVITATION'
    | 'DELETE_FRIEND' => {
    const isFriend = friends?.find((friend) => friend.uuid === friendId);
    if (isFriend) {
      return 'DELETE_FRIEND';
    }
    const sentRequest = sentFriendRequests?.find(
      (request) => request.receiver.uuid === friendId
    );

    if (sentRequest) {
      return 'CANCEL_INVITATION';
    }

    const receivedRequest = receivedFriendRequests?.find(
      (request) => request.sender.uuid === friendId
    );
    if (receivedRequest) {
      return 'ACCEPT_INVITATION';
    }
    return 'SEND_INVITATION';
  };

  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3',
        className
      )}>
      {items.map((item, idx) => (
        <Link
          href={item?.link}
          key={item?.link}
          className='relative group block p-2 h-full w-full'
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}>
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className='absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl'
                layoutId='hoverBackground'
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            {userId && userId !== item.id && (
              <FriendInvitationButton
                friendUuid={item.id}
                status={getFriendInvitationStatus(item.id)}
              />
            )}

            <CardTitle title={item.title} points={item.points} />
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'rounded-2xl h-full w-full p-2 overflow-hidden bg-white dark:bg-black border border-black/[0.2] dark:border-white/[0.2] group-hover:border-slate-700 relative z-10',
        className
      )}>
      <div className='relative'>
        <div className='p-2'>{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  title,
  points,
}: {
  className?: string;
  title: string;
  points: number;
}) => {
  const t = useTranslations('ProfilesPage');
  return (
    <h4 className={cn('flex items-center text-sm', className)}>
      <UserAvatar className='mr-4' />
      <div className='max-w-[55%]'>
        <p className='text-current font-bold tracking-wide truncate'>{title}</p>
        <p>{t('total', { points: points })}</p>
      </div>
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        'pt-4 mt-4 dark:text-zinc-400 tracking-wide leading-relaxed text-sm border-t-2',
        className
      )}>
      {children}
    </p>
  );
};
