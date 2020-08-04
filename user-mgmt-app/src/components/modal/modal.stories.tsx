import { boolean, text } from '@storybook/addon-knobs';
import React from 'react';
import { Modal as ModalComponent } from './index';

export default {
  title: 'Modal',
  component: ModalComponent,
};

export const Modal = () => {
  return (
    <ModalComponent visible={boolean('Visible', true)}>
      <div>{text('Modal Text', 'This is some modal content')}</div>
    </ModalComponent>
  );
};
