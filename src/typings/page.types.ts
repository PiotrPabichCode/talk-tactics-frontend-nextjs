type PageMeta1 = {
  currentPage: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type Page1<T> = {
  items: Array<T>;
  meta: PageMeta1;
};

export type Pageable = {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
};

export type Sort = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

export type Page<T> = {
  content: Array<T>;
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: boolean;
  empty: boolean;
};

export const mapPageContent = <T, U>(
  page: Page<T>,
  mapFn: (item: T) => U
): Page<U> => ({
  ...page,
  content: page.content.map(mapFn),
});
