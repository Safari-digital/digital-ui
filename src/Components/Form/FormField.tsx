import React from 'react';
import { InputText, type InputTextProps } from '../InputText';
import { Box } from '../Box';
import { useClassName } from '../../modules';
import './Form.styles.css';

export interface FormFieldProps extends Omit<InputTextProps, 'value' | 'onChange'> {
    value: string;
    onChange: (value: string) => void;
    label?: string;
}

const FormField = React.forwardRef(
    ({ label, type, className, id, ...inputProps }: FormFieldProps, ref: React.Ref<HTMLDivElement>) => {
        const resolvedClassName = useClassName({ type, className }, 'SafariUi-FormField');
        console.log(inputProps);
        return (
            <Box
                id={id}
                ref={ref}
                className={resolvedClassName}
                direction="row"
                mt={1}
                gap={2}
                justify="space-between"
                align="center">
                <React.Fragment>
                    {label && <label className="SafariUi-FormField-label">{label}</label>}
                    <InputText type={type} {...inputProps} />
                </React.Fragment>
            </Box>
        );
    },
);

export default FormField;
