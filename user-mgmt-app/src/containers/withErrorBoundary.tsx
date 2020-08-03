import React from 'react';
import { ErrorBoundary } from 'components/error-boundary';

export const withErrorBoundary = <T extends object>(
  Component: React.ComponentType<T>
) =>
  class WithError extends React.Component {
    render() {
      const { ...props } = this.props;
      return (
        <ErrorBoundary>
          <Component {...(props as T)} />
        </ErrorBoundary>
      );
    }
  };
