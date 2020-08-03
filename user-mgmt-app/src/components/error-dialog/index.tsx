import React from 'react';

export interface ErrorDialogProps {
  errorMessage: string;
}

const ErrorDialogComponent: React.FC<ErrorDialogProps> = ({ errorMessage }) => {
  return <div>{errorMessage}</div>;
};

export const ErrorDialog = ErrorDialogComponent;
