'use client';

import { Table } from '@/components/table/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { useGetCourseItemById } from '@/services/queries/course.query';
import { columns } from './_components/columns';
import { Button } from '@/components/ui/button';
import { Undo2 } from 'lucide-react';
import Link from 'next/link';
import { AudioPlayer } from './_components/audio-player';

export default function SingleCourseItemPage({
  params,
}: {
  params: { courseId: number; courseItemId: number };
}) {
  const {
    data: courseItem,
    isFetching,
    isError,
  } = useGetCourseItemById(params.courseItemId);
  if (isFetching) {
    return <Spinner />;
  }
  if (!courseItem || isError) {
    return null;
  }

  return (
    <div className='p-4 text-center'>
      <Card className='relative'>
        <Link
          href={`/courses/${params.courseId}`}
          className='animate-fade-up'
          style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
          <Button variant='action' className='absolute top-5 right-5'>
            <p className='hidden md:block md:mr-2'>Back to course</p>
            <Undo2 className=' h-4 w-4' />
          </Button>
        </Link>
        <CardHeader className='items-center'>
          <CardTitle
            className='animate-fade-up'
            style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            {courseItem.word}
          </CardTitle>
          <CardDescription
            className='flex flex-row items-center gap-1 animate-fade-up'
            style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            {courseItem.phonetic}
            {courseItem.audio && <AudioPlayer url={courseItem.audio} />}
          </CardDescription>
          <CardDescription
            className='animate-fade-up'
            style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            {courseItem.partOfSpeech}
          </CardDescription>
          <CardDescription
            className='font-bold pt-2 animate-fade-up'
            style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            {courseItem.course.title}
          </CardDescription>
        </CardHeader>
        <Separator
          className='mb-2 animate-fade-up'
          style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
        />
        <CardContent
          className='animate-fade-up'
          style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
          <Table columns={columns} data={courseItem.meanings} />
        </CardContent>
      </Card>
    </div>
  );
}
