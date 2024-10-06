import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Button, { type ButtonProps } from './Button';
import { Icon } from '../Icon';

const meta: Meta<ButtonProps> = {
    title: 'Inputs/Button',
    component: Button,
    decorators: (Story, { args }) =>
        args.variant === 'icon' ? (
            <Button {...args}>
                <Icon.GearIcon />
            </Button>
        ) : (
            <Story {...args} />
        ),
};
type Story = StoryObj<typeof meta>;
export default meta;

export const Primary: Story = {
    argTypes: {
        children: {
            control: { type: 'text' },
        },
        loading: {
            control: { type: 'boolean' },
        },
        disabled: {
            control: { type: 'boolean' },
        },
        selected: {
            control: { type: 'boolean' },
        },
        fullWidth: {
            control: { type: 'boolean' },
        },
        variant: {
            control: { type: 'select' },
            options: ['primary', 'secondary', 'text', 'icon'],
        },
    },
    args: {
        variant: 'primary',
        children: 'Primary Button',
        disabled: false,
        selected: false,
        loading: false,
        fullWidth: false,
    },
};

export const SecondaryVariant: Story = {
    args: {
        ...Primary.args,
        variant: 'secondary',
        children: 'Secondary Button',
    },
    argTypes: Primary.argTypes,
};

export const TextVariant: Story = {
    args: {
        ...Primary.args,
        variant: 'text',
        children: 'Text Button',
    },
    argTypes: Primary.argTypes,
};

export const IconVariant: Story = {
    args: {
        ...Primary.args,
        variant: 'icon',
    },
    argTypes: Primary.argTypes,
};
