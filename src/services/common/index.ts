import { GetLocalizedMessage } from '@/i18n';
import { toast } from 'sonner';

export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    console.error(error);
  }
  toast.error(GetLocalizedMessage('Error.baseRequest.title'), {
    description: GetLocalizedMessage('Error.baseRequest.description'),
  });
};
