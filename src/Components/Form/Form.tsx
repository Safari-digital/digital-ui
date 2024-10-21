import React from 'react';
import { useClassName, useProps } from '../../modules';
import { Box } from '../Box';
import { Button } from '../Button';
import type { SafariNodeWithChildren } from '../types';
import './Form.styles.css';

export interface FormProps extends SafariNodeWithChildren {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    loading?: boolean | undefined;
}

export default function Form({ children, id, ...props }: FormProps) {
    const className = useClassName(props, 'SafariUi-Form');
    const { mapProps } = useProps({ children, loading: props.loading });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.onSubmit(e);
    };

    return (
        <form id={id} className={className} onSubmit={handleSubmit}>
            {mapProps()}
            <Box mt={1} justify="end" direction="row">
                <Button loading={props.loading} type="submit">
                    Submit
                </Button>
            </Box>
        </form>
    );
}
