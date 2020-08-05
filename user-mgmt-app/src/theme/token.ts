import { AsUnion } from 'theme/types';

export const color = {
  text: 'text',
  background: 'background',
  primary: 'primary',
  secondary: 'secondary',
  disabled: 'disabled',
} as const;

export type Color = AsUnion<typeof color>;
