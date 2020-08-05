import React from 'react';
import { ErrorDialog as ErrorDialogComponent } from './index';
import { text } from '@storybook/addon-knobs';

export default {
  title: 'ErrorDialog',
  component: ErrorDialogComponent,
};

export const ErrorDialog = () => {
  return (
    <div>
      <div style={{ height: 200, width: 200 }}>
        This is some page content behind the modal
      </div>
      <ErrorDialogComponent
        errorMessage={text(
          'Error Message',
          'Some really serious error occurred - whoa!'
        )}
      />
    </div>
  );
};
