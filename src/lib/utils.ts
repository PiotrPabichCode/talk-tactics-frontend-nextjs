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
