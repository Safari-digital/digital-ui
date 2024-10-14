/* eslint react-hooks/rules-of-hooks: 0 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Form, { type FormProps } from './Form';
import FormField from './FormField';
import { Box } from '../Box';

const meta: Meta<FormProps> = {
    title: 'Inputs/Form',
    component: Form,
    decorators: () => {
        const [formState, setFormState] = React.useState({
            Required: { value: '', type: 'text' as const, required: true },
            Email: { value: '', type: 'email' as const, required: true },
            Pattern: {
                value: '',
                type: 'text' as const,
                pattern: '^[A-Za-z]+$',
                patternMessage: 'Only letters are allowed',
            },
        });

        return (
            <Box>
                <Form onSubmit={() => console.log('data', formState)}>
                    {Object.entries(formState).map(([key, obj]) => (
                        <FormField
                            key={key}
                            label={`${key} field - ${obj.type}`}
                            // @ts-ignore
                            onChange={v => setFormState(prev => ({ ...prev, [key]: { ...prev[key], value: v } }))}
                            {...obj}
                        />
                    ))}
                </Form>
                <pre>
                    <code>{JSON.stringify(formState, null, 2)}</code>
                </pre>
            </Box>
        );
    },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Primary: Story = {
    argTypes: {
        loading: { control: 'boolean' },
    },
    args: {
        loading: false,
    },
};
