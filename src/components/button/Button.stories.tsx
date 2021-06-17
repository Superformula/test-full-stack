import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Button, ButtonProps } from './Button';

export default {
  title: 'Button',
  component: Button,
} as Meta;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  color: 'primary',
  onClick: () => alert('clicked'),
  text: 'Click me',
};

export const Secondary = Template.bind({});
Secondary.args = {
  color: 'primary',
  onClick: () => alert('clicked'),
  text: 'Click me',
};

export const Disabled = Template.bind({});
Disabled.args = {
  color: 'primary',
  onClick: () => alert('clicked'),
  text: 'Click me',
  disabled: true,
};
