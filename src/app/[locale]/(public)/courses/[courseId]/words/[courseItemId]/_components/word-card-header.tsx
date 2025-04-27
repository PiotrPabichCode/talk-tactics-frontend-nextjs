import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AudioPlayer } from './audio-player';
import { CourseWord } from '@/typings/course';

export function WordCardHeader({
  word: {
    word,
    phonetic,
    audio,
    partOfSpeech,
    course: { title },
  },
}: {
  word: CourseWord;
}) {
  return (
    <CardHeader className='items-center'>
      <CardTitle
        className='animate-fade-up'
        style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
        {word}
      </CardTitle>
      <CardDescription
        className='flex flex-row items-center gap-1 animate-fade-up'
        style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
        {phonetic}
        {audio && <AudioPlayer url={audio} />}
      </CardDescription>
      <CardDescription
        className='animate-fade-up'
        style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
        {partOfSpeech}
      </CardDescription>
      <CardDescription
        className='font-bold pt-2 animate-fade-up'
        style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
        {title}
      </CardDescription>
    </CardHeader>
  );
}
