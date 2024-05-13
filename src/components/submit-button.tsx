import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { GetLocalizedMessage } from '@/i18n';

export function SubmitButton({
  enabled = false,
  disabled = false,
  title,
}: {
  enabled: boolean;
  disabled: boolean;
  title?: string;
}) {
  return (
    <Button
      type='submit'
      disabled={disabled}
      className={cn(!enabled && 'hidden')}>
      {title ? title : GetLocalizedMessage('Common.submit')}
    </Button>
  );
}
