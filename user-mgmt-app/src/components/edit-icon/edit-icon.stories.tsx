import React from 'react';
import { EditIcon as EditIconComponent } from './index';

export default {
  title: 'EditIcon',
  component: EditIconComponent,
};

export const EditIcon = () => {
  return (
    <EditIconComponent
      onClick={() => {
        alert('Clicked!');
      }}
    />
  );
};
