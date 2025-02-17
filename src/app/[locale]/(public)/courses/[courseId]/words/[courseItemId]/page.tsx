'use client';

import { Card } from '@/components/ui/card';
import { useGetCourseItemById } from '@/services/queries/course.query';
import { WordsPageSkeleton } from './_components/words-page-skeleton';
import { BackButton } from './_components/back-button';
import { WordCardHeader } from './_components/word-card-header';
import { WordDefinitionsTable } from './_components/word-definitions-table';
import { use } from 'react';

export default function SingleCourseItemPage({
  params,
}: {
  params: Promise<{ courseId: number; courseItemId: number }>;
}) {
  const { courseId, courseItemId } = use(params);
  const { data: word, isFetching } = useGetCourseItemById(courseItemId);
  if (isFetching) {
    return <WordsPageSkeleton />;
  }

  return (
    <div className='p-4 text-center'>
      <Card className='relative'>
        <BackButton courseId={courseId} />
        <WordCardHeader word={word} />
        <WordDefinitionsTable examples={word.meanings} />
      </Card>
    </div>
  );
}
