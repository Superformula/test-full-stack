import { Theme as SSTheme } from '@styled-system/css';
import { SerializedStyles } from '@emotion/serialize';
import { Color } from 'theme/token';

export type Theme = SSTheme & {
  globalStyles: SerializedStyles;
  colors: Record<Color, string>;
};

export type ValidKeyTypes = string | number;
export type AsUnion<T> = T extends ReadonlyArray<infer C>
  ? C extends ValidKeyTypes
    ? T[number]
    : never
  : T extends object
  ? keyof T
  : never;
