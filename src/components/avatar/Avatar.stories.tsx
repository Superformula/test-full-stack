import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Avatar, AvatarProps } from './Avatar';

export default {
  title: 'Avatar',
  component: Avatar,
} as Meta;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: Story<AvatarProps> = (args) => <Avatar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  url: 'https://images.unsplash.com/photo-1595183265031-b4cb347a8353?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  alt: 'Man',
};
