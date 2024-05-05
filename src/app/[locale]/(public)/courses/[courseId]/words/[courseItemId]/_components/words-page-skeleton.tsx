import { DataTableSkeleton } from '@/components/table/data-table-skeleton';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export function WordsPageSkeleton() {
  return (
    <div className='p-4 text-center'>
      <Card className='relative'>
        <div>
          <Skeleton className='absolute top-5 right-5 h-[35px] w-[45px] md:w-40' />
        </div>
        <CardHeader className='items-center'>
          <CardTitle>
            <Skeleton className='h-4 w-[150px]' />
          </CardTitle>
          <CardDescription>
            <Skeleton className='h-4 w-[140px]' />
          </CardDescription>
          <CardDescription>
            <Skeleton className='h-4 w-[80px] mb-4' />
          </CardDescription>
          <CardDescription>
            <Skeleton className='h-4 w-[160px]' />
          </CardDescription>
        </CardHeader>
        <Separator className='mb-2' />
        <CardContent>
          <DataTableSkeleton
            columnCount={3}
            showViewOptions={false}
            cellWidths={['4rem', '40rem', '20rem']}
            shrinkZero
          />
        </CardContent>
      </Card>
    </div>
  );
}
