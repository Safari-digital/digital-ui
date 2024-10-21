import React from 'react';
import { useClassName } from '../../modules';
import type { ControlledHandler, SafariInputNode } from '../types';
import './InputText.styles.css';

export interface InputTextProps extends SafariInputNode {
    value: string;
    onChange: ControlledHandler<string>;
    onSelect?: ControlledHandler<string>;
    onBlur?: ControlledHandler<string>;
    pattern?: string;
    patternMessage?: string;
    required?: boolean;
    requiredMessage?: string;
    type?: 'text' | 'password' | 'email';
    fullWidth?: boolean | undefined;
}

export default function InputText({ type = 'text', pattern, patternMessage, ...props }: InputTextProps) {
    const ref = React.useRef<HTMLInputElement>(null);
    const [hasError, setHasError] = React.useState(false);
    const [selected, setSelected] = React.useState(false);
    const className = useClassName({ ...props, error: hasError, selected }, 'SafariUi-InputText');

    // Restore error state on value change
    React.useEffect(() => ref.current?.setCustomValidity(''), [props.value]);

    // Handle required field
    React.useEffect(() => {
        if (props.required && props.value === '')
            ref.current?.setCustomValidity(props.requiredMessage ?? 'This field is required');
    }, [props.required, props.requiredMessage, props.value]);

    const testValue = React.useCallback((value: string) => !pattern || new RegExp(pattern).test(value), [pattern]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.loading) return;
        const isValid =
            (e.target.value !== '' && testValue(e.target.value)) || (e.target.value === '' && !props.required);

        isValid && setHasError(false);
        handlePattern(e, !isValid);
        props.onChange(e.target.value);
    };

    const handlePattern = (e: React.ChangeEvent<HTMLInputElement>, error: boolean) => {
        if (error && e.target.value !== '') {
            e.target.setCustomValidity(patternMessage ?? 'Invalid input');
        } else if (props.required && e.target.value === '') {
            e.target.setCustomValidity(props.requiredMessage ?? 'This field is required');
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
                ref={ref}
                value={props.value}
                pattern={pattern}
                disabled={props.disabled}
                type={type}
                onChange={handleChange}
                onSelect={handleSelect}
                onBlur={handleBlur}
                onError={() => setHasError(true)}
                onInvalid={() => setHasError(true)}
            />
        </div>
    );
}
