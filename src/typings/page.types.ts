export type PageMeta = {
  currentPage: number;
  totalItems: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  size: number;
};

export type Page<T> = {
  items: Array<T>;
  meta: PageMeta;
};

export type ApiPage<T> = {
  content: Array<T>;
  totalPages: number;
  totalElements: number;
  number: number;
  first: boolean;
  last: boolean;
  size: number;
};
