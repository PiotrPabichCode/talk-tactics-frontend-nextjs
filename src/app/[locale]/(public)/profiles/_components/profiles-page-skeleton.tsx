import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function ProfilesPageSkeleton() {
  return (
    <div className='p-4 flex flex-col items-center w-screen space-y-3'>
      <Skeleton className='h-[24px] w-[200px] mb-2' />
      <Separator className='max-w-4xl' />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full max-w-4xl'>
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={'profile-skeleton' + i} className='p-3'>
            <div className='flex'>
              <Skeleton className='size-12 rounded-full mr-4' />
              <div className='mb-4 space-y-3'>
                <Skeleton className='h-[16px] w-[160px]' />
                <Skeleton className='h-[16px] w-[100px]' />
              </div>
            </div>
            <div className='flex flex-col space-y-2 p-4 items-center'>
              <Skeleton className='h-[6px] w-full' />
              <Skeleton className='h-[6px] w-[80%]' />
              <Skeleton className='h-[6px] w-[90%]' />
              <Skeleton className='h-[6px] w-[70%]' />
              <Skeleton className='h-[6px] w-[90%]' />
              <Skeleton className='h-[6px] w-[60%]' />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
