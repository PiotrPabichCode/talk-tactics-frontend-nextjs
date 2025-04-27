'use client';

import { Card } from '@/components/ui/card';
import { WordsPageSkeleton } from './_components/words-page-skeleton';
import { BackButton } from './_components/back-button';
import { WordCardHeader } from './_components/word-card-header';
import { WordDefinitionsTable } from './_components/word-definitions-table';
import { use } from 'react';
import { useGetCourseWordByUuid } from '@/services/queries/course/course.query';

export default function SingleCourseItemPage({
  params,
}: {
  params: Promise<{ courseId: string; courseItemId: string }>;
}) {
  const { courseId, courseItemId } = use(params);
  const { data: word, isFetching } = useGetCourseWordByUuid(courseItemId);
  if (isFetching) {
    return <WordsPageSkeleton />;
  }

  return (
    <div className='p-4 text-center'>
      <Card className='relative'>
        <BackButton courseId={courseId} />
        <WordCardHeader word={word} />
        <WordDefinitionsTable definitions={word.definitions} />
      </Card>
    </div>
  );
}
