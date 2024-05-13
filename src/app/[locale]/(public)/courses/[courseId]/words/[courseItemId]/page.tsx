'use client';

import { Card } from '@/components/ui/card';
import { useGetCourseItemById } from '@/services/queries/course.query';
import { WordsPageSkeleton } from './_components/words-page-skeleton';
import { BackButton } from './_components/back-button';
import { WordCardHeader } from './_components/word-card-header';
import { WordDefinitionsTable } from './_components/word-definitions-table';

export default function SingleCourseItemPage({
  params,
}: {
  params: { courseId: number; courseItemId: number };
}) {
  const {
    data: word,
    isFetching,
    isError,
  } = useGetCourseItemById(params.courseItemId);
  if (isFetching) {
    return <WordsPageSkeleton />;
  }
  if (!word || isError) {
    return null;
  }

  return (
    <div className='p-4 text-center'>
      <Card className='relative'>
        <BackButton courseId={params.courseId} />
        <WordCardHeader word={word} />
        <WordDefinitionsTable examples={word.meanings} />
      </Card>
    </div>
  );
}
