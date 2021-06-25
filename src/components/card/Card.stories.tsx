import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Card } from './Card';

export default {
  title: 'Card',
  component: Card,
} as Meta;

const Template: Story = (args) => (
  <Card {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
