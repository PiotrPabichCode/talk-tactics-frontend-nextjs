import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MyCoursesFilter({
  isEnabled,
  isActive,
  onChange,
}: {
  isEnabled: boolean;
  isActive: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    isEnabled && (
      <Button
        onClick={() => {
          onChange(!isActive);
        }}
        variant='outline'
        size='sm'
        className={cn(
          'h-8 border-dashed',
          isActive && 'bg-green-500 hover:bg-green-600 border-none'
        )}>
        {isActive && <Check className='mr-2 h-4 w-4' />}
        My courses
      </Button>
    )
  );
}
