import { boolean, text } from '@storybook/addon-knobs';
import { PrimaryButton as PrimaryButtonComponent } from '.';
import React from 'react';

export default {
  title: 'PrimaryButton',
  component: PrimaryButtonComponent,
};

export const PrimaryButton = () => {
  return (
    <PrimaryButtonComponent
      disabled={boolean('Disabled', false)}
      onClick={() => {
        alert('Clicked!');
      }}
    >
      {text('Button Text', 'Button Text')}
    </PrimaryButtonComponent>
  );
};
