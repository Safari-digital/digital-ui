import React from 'react';
import { useClassName } from '../../modules';
import './InputText.styles.css';
import type { SafariInputNode } from '../types';

export interface InputTextProps extends SafariInputNode {
    value: string;
    onChange: (value: string) => void;
    onSelect?: (value: string) => void;
    onBlur?: (value: string) => void;
    pattern?: string;
    patternMessage?: string;
    type?: 'text' | 'password' | 'email';
    fullWidth?: boolean | undefined;
}

export default function InputText({ type = 'text', pattern, patternMessage, ...props }: InputTextProps) {
    const [hasError, setHasError] = React.useState(false);
    const [selected, setSelected] = React.useState(false);
    const className = useClassName({ ...props, error: hasError, selected }, 'SafariUi-InputText');

    const testValue = React.useCallback((value: string) => !pattern || new RegExp(pattern).test(value), [pattern]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.loading) return;
        const isValid = e.target.value === '' || testValue(e.target.value);
        setHasError(!isValid);
        handlePattern(e, !isValid);
        props.onChange(e.target.value);
    };

    const handlePattern = (e: React.ChangeEvent<HTMLInputElement>, error: boolean) => {
        if (error) {
            e.target.setCustomValidity(patternMessage ?? 'Invalid input');
        } else {
            e.target.setCustomValidity('');
        }
    };

    const handleSelect = () => {
        props.onSelect?.(props.value);
        setSelected(true);
    };
    const handleBlur = () => {
        props.onBlur?.(props.value);
        setSelected(false);
    };

    return (
        <div className={className} id={props.id}>
            <input
                pattern={pattern}
                disabled={props.disabled}
                type={type}
                onChange={handleChange}
                onSelect={handleSelect}
                onBlur={handleBlur}
            />
        </div>
    );
}
