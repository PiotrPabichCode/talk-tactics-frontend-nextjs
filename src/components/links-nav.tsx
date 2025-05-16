'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';
import React from 'react';
import { cn } from '@/lib/utils';
import { CourseNavbarDto, LocalizeCourseLevel } from '@/typings/course';
import Image from 'next/image';
import { useTranslations } from '@/i18n';
import { Link } from '@/navigation';

const RecommendedCourses = ({ courses }: { courses: CourseNavbarDto[] }) => {
  const t = useTranslations('Navigation.courses');
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{t('title')}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className='grid gap-3 p-6 w-[90vw] md:w-[400px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]'>
          <li className='row-span-3'>
            <NavigationMenuLink asChild>
              <Link
                className='flex h-full w-full select-none flex-col rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                href='/courses'>
                <div className='flex flex-row items-center justify-center md:block space-x-3 md:space-x-0'>
                  <Image
                    src={'/english.svg'}
                    alt='English flag'
                    width={32}
                    height={32}
                  />
                  <div className='mb-2 mt-4 text-lg font-medium'>
                    {t('title')}
                  </div>
                </div>
                <p className='text-sm leading-tight text-muted-foreground'>
                  {t('description')}
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
          {courses.map((course) => (
            <ListItem
              key={course.uuid}
              href={`/courses/${course.uuid}`}
              title={LocalizeCourseLevel(course.level)}>
              {course.title}
            </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

const WordOptions = ({ courses }: { courses: CourseNavbarDto[] }) => {
  const t = useTranslations('Navigation.random');
  const BASE_DESCRIPTION = t('top');
  return (
    <NavigationMenuItem className=''>
      <NavigationMenuTrigger>{t('title')}</NavigationMenuTrigger>
      <NavigationMenuContent className='overflow-x-hidden'>
        <ul className='grid grid-cols-1 gap-3 p-4 w-full'>
          {courses.map((course) => (
            <ListItem
              key={course.level + '_word'}
              title={LocalizeCourseLevel(course.level)}
              href={`/courses/${course.uuid}/words/${course.wordUuid}`}>{`${BASE_DESCRIPTION} ${
              course.level === 'ADVANCED'
                ? '<85%'
                : course.level === 'INTERMEDIATE'
                ? '85-94%'
                : '95-99%'
            }`}</ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

const Leaderboard = () => {
  const t = useTranslations('Navigation.leaderboard');
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{t('title')}</NavigationMenuTrigger>
      <NavigationMenuContent className='overflow-x-hidden'>
        <ul className='grid grid-cols-1 gap-3 p-4 w-full'>
          <ListItem href='/profiles' title={t('profiles')}>
            {t('users')}
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          href={props.href as string}
          {...props}>
          <div className='text-sm font-medium leading-none line-clamp-1'>
            {title}
          </div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export function LinksNav({
  header,
  courses,
}: {
  header?: boolean;
  courses: CourseNavbarDto[];
}) {
  return (
    <NavigationMenu>
      <NavigationMenuList className={cn(!header && 'flex-col items-start')}>
        <Leaderboard />
        <RecommendedCourses courses={courses} />
        <WordOptions courses={courses} />
      </NavigationMenuList>
    </NavigationMenu>
  );
}
