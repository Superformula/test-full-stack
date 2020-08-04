import { AsUnion } from 'theme/util.types';

export const color = {
  text: 'text',
  background: 'background',
  primary: 'primary',
  secondary: 'secondary',
} as const;

export type Color = AsUnion<typeof color>;
