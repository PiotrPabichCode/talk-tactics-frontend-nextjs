import { Control } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { CheckIcon, Command } from 'lucide-react';
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';

export function FormPopover({
  label,
  description,
  name,
  values,
  searchPlaceholder,
  emptyMessage,
  control,
  onSelect,
}: {
  name: string;
  description?: string;
  label?: string;
  values: readonly { label: string; value: string }[];
  searchPlaceholder: string;
  emptyMessage: string;
  control?: Control<any>;
  onSelect: (value: string) => void;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant='outline'
                  role='combobox'
                  className={cn(
                    'w-[200px] justify-between',
                    !field.value && 'text-muted-foreground'
                  )}>
                  {field.value
                    ? values.find((val) => val.value === field.value)?.label
                    : searchPlaceholder}
                  <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
          </Popover>
          <PopoverContent className='w-[200px] p-0'>
            <Command>
              <CommandInput placeholder={searchPlaceholder} />
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                <CommandList>
                  {values.map((val) => (
                    <CommandItem
                      value={val.label}
                      key={val.value}
                      onSelect={onSelect}>
                      <CheckIcon
                        className={cn(
                          'mr-2 h-4 w-4',
                          val.value === field.value
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                      {val.label}
                    </CommandItem>
                  ))}
                </CommandList>
              </CommandGroup>
            </Command>
          </PopoverContent>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
