import { CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { columns } from './columns';
import { WordMeaning } from '@/typings/course';
import { Table } from '@/components/table/table';

export function WordDefinitionsTable({
  examples: definitons,
}: {
  examples: WordMeaning[];
}) {
  return (
    <>
      <Separator
        className='mb-2 animate-fade-up'
        style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
      />
      <CardContent
        className='animate-fade-up'
        style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
        <Table columns={columns} data={definitons} />
      </CardContent>
    </>
  );
}
