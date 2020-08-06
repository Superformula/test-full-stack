import { boolean, text } from '@storybook/addon-knobs';
import { Loading as LoadingComponent } from 'components/loading';
import React from 'react';

export default {
  title: 'Loading',
  component: LoadingComponent,
};

export const Modal = () => {
  return (
    <LoadingComponent
      message={text('Message', 'Loading...')}
      visible={boolean('Visible', true)}
    />
  );
};
