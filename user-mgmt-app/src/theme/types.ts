import { Theme as SSTheme } from '@styled-system/css';
import { SerializedStyles } from '@emotion/serialize';

export type Theme = SSTheme & {
  globalStyles: SerializedStyles;
  colors: string;
};
