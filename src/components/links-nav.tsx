'use client';

import Link from 'next/link';
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
import { CourseDto } from '@/typings/course';
import uniqBy from 'lodash/uniqBy';
import { shuffle } from 'lodash';

const generateWordOptions: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: 'BEGINNER',
    description: 'Most frequently used english words - Top <80%',
    href: '',
  },
  {
    title: 'INTERMEDIATE',
    description: 'Most frequently used english words - Top 80-90%',
    href: '',
  },
  {
    title: 'ADVANCED',
    description: 'Most frequently used english words - Top 90-99%',
    href: '',
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}>
          <div className='text-sm font-medium leading-none line-clamp-1'>
            {title}
          </div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
            {children}
          </p>
        </a>
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
  courses: CourseDto[];
}) {
  if (!courses) {
    return null;
  }
  const shuffledCourses = shuffle(courses);
  const uniqueCourses: CourseDto[] = uniqBy(
    shuffledCourses,
    (course: CourseDto) => course.level
  );
  return (
    <NavigationMenu orientation={!header ? 'vertical' : 'horizontal'}>
      <NavigationMenuList className={cn(!header && 'flex-col items-start')}>
        <NavigationMenuItem>
          <NavigationMenuTrigger>English courses</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid gap-3 p-6 w-[90vw] md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
              <li className='row-span-3'>
                <NavigationMenuLink asChild>
                  <Link
                    className='flex h-full w-full select-none flex-col rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                    href='/courses'>
                    <img
                      src={'/english.svg'}
                      alt='English flag'
                      className='h-8 w-8'
                    />
                    <div className='mb-2 mt-4 text-lg font-medium'>
                      English courses
                    </div>
                    <p className='text-sm leading-tight text-muted-foreground'>
                      {uniqueCourses[0].description}
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem
                href={`/courses/${uniqueCourses[0].id}`}
                title={uniqueCourses[0].level}>
                {uniqueCourses[0].name}
              </ListItem>
              <ListItem
                href={`/courses/${uniqueCourses[1].id}`}
                title={uniqueCourses[1].level}>
                {uniqueCourses[1].name}
              </ListItem>
              <ListItem
                href={`/courses/${uniqueCourses[2].id}`}
                title={uniqueCourses[2].level}>
                {uniqueCourses[2].name}
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className=''>
          <NavigationMenuTrigger>Generate random word</NavigationMenuTrigger>
          <NavigationMenuContent className='overflow-x-hidden'>
            <ul className='grid grid-cols-1 gap-3 p-4 w-full'>
              {generateWordOptions.map((option) => (
                <ListItem
                  key={option.title}
                  title={option.title}
                  href={option.href}>
                  {option.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
