import { text } from '@storybook/addon-knobs';
import { Input as InputComponent } from 'components/input';
import React, { useState } from 'react';
import { Optional } from 'types';

export default {
  title: 'Input',
  component: InputComponent,
};

export const ErrorDialog = () => {
  const [value, setValue] = useState<Optional<string>>();

  const label = text('Label', 'Search');

  return (
    <InputComponent
      name="input"
      label={label}
      value={value}
      placeholder={label}
      onChange={(newValue: Optional<string>) => setValue(newValue)}
    />
  );
};
