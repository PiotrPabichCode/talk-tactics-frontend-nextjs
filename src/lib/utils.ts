import { type ClassValue, clsx } from 'clsx';
import {
  Dictionary,
  differenceWith,
  fromPairs,
  isEqual,
  toPairs,
} from 'lodash';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getChangedValues<T>(
  a: Dictionary<unknown>,
  b: Dictionary<unknown>
): T {
  return fromPairs(differenceWith(toPairs(b), toPairs(a), isEqual)) as T;
}

export function formatDate(
  date: Date | string | number,
  opts: Intl.DateTimeFormatOptions = {}
) {
  return new Intl.DateTimeFormat('en-US', {
    month: opts.month ?? 'long',
    day: opts.day ?? 'numeric',
    year: opts.year ?? 'numeric',
    ...opts,
  }).format(new Date(date));
}

export function toSentenceCase(str: string) {
  return str
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase())
    .replace(/\s+/g, ' ')
    .trim();
}
