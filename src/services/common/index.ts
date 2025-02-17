import { GetSearchParamsSchema } from '@/app/[locale]/(public)/courses/_lib/validations';
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

export const buildPageableUrl = <T>(
  baseUrl: string,
  searchParams: GetSearchParamsSchema<T>
): string => {
  const sort = searchParams.sort
    .map((item) => `${item.id},${item.desc ? 'desc' : 'asc'}`)
    .join(',');
  let url = `${baseUrl}?page=${searchParams.page - 1}&size=${
    searchParams.perPage
  }&sort=${sort}`;
  if (searchParams.search) {
    url += `&search=${encodeURIComponent(searchParams.search)}`;
  }

  return url;
};
