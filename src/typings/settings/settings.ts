import z from 'zod';

export type FontType = 'inter' | 'manrope' | 'montserrat';

export const Font = z.union([
  z.literal('inter'),
  z.literal('manrope'),
  z.literal('montserrat'),
]);
