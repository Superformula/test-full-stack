import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Typography } from './Typography';

export default {
  title: 'Typography',
  component: Typography,
} as Meta;

export const VariantHeader1: Story = () => (
  <Typography variant="h1">
    H1 Source Sans Pro Light 48px
  </Typography>
);

export const VariantHeader2: Story = () => (
  <Typography variant="h2">
    H2 Header Source Sans Pro Semibold 21px
  </Typography>
);

export const VariantParagraph: Story = () => (
  <Typography variant="paragraph">
    Parahraph Source Sans Pro Light 16px
  </Typography>
);

export const ColorError: Story = () => (
  <Typography variant="paragraph" color="error">
    Parahraph Source Sans Pro Light 16px
  </Typography>
);
