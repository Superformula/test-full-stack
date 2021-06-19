import { format } from 'date-fns';

// eslint-disable-next-line import/prefer-default-export
export const formatDate = (date: string): string => format(new Date(date), 'DD MMM YYYY');
