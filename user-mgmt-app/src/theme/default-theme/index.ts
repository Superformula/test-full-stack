import { color } from 'theme/token';
import { Theme } from '../types';
import { globalStyles } from './global-styles';

const colors = {
  [color.text]: '#000000',
  [color.background]: '#F8F8F8',
  [color.primary]: '#5B2C6F',
  [color.secondary]: '#FFFFFF',
  [color.disabled]: 'rgba(0, 0, 0, 0.5)',
};

const DefaultTheme: Theme = {
  globalStyles,
  colors,
};

export default DefaultTheme;
