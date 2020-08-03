import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { VIEWPORT_BREAKPOINTS } from './viewport-breakpoints';
import { ThemeKnob } from './theme-knob';

addParameters({
    viewport: {
        viewports: VIEWPORT_BREAKPOINTS,
    },
});

addDecorator(withKnobs);

const ThemeDecorator = storyFn => <ThemeKnob>{storyFn()}</ThemeKnob>;
addDecorator(ThemeDecorator);
