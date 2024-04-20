import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

export const ProfilesGrid = ({
  items,
  className,
}: {
  items: {
    title: string;
    points: number;
    description: string;
    link: string;
    avatar: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
          className='relative group  block p-2 h-full w-full'
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
            <CardTitle
              title={item.title}
              points={item.points}
              avatar={item.avatar}
            />
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
        'rounded-2xl h-full w-full p-2 overflow-hidden bg-blue-50 dark:bg-black border border-black/[0.2] dark:border-white/[0.2] group-hover:border-slate-700 relative z-10',
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
  avatar,
  title,
  points,
}: {
  className?: string;
  avatar: string;
  title: string;
  points: number;
}) => {
  return (
    <h4 className={cn('flex items-center', className)}>
      <Avatar className='bg-slate-100 mr-4'>
        <AvatarImage src={avatar} alt={'User account placeholder'} />
      </Avatar>
      <div>
        <p className='text-current font-bold tracking-wide'>{title}</p>
        <p>Total score: {points}</p>
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
