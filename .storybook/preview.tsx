import { Preview, StoryFn } from '@storybook/react';
import React from 'react';

const Decorator = (Story: StoryFn) => {
    return (
        <div
            style={{
                boxSizing: 'border-box',
                display: 'flex',
                padding: '2rem',
            }}>
            <Story />
        </div>
    );
};

export default {
    decorators: [Decorator],
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        layout: 'fullscreen',
        options: {
            storySort: {
                order: ['*'],
            },
        },
    },
} satisfies Preview;
