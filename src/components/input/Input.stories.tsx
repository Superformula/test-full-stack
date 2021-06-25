import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Input, InputProps } from './Input';

export default {
  title: 'Input',
  component: Input,
} as Meta;

const Template: Story = (args:InputProps) => (
  <Input {...args} />
);

export const Primary = Template.bind({});

export const InputWithPlaceholder = Template.bind({});
InputWithPlaceholder.args = {
  placeholder: 'Placeholder',
};

export const InputWithLabel = Template.bind({});
InputWithLabel.args = {
  label: 'Label',
  placeholder: 'Placeholder',
};
