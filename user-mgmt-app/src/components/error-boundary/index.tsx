import React from 'react';
import { ErrorDialog } from '../error-dialog';
import Catch from './functional-error-boundary';

type Props = {
  children: React.ReactNode;
};

export const ErrorBoundary = Catch(function MyErrorBoundary(
  props: Props,
  error?: Error,
) {
  if (error) {
    return (
      <ErrorDialog errorMessage={`An error has occured: ${error?.message}`} />
    );
  }
    return <>{props.children}</>;
});
