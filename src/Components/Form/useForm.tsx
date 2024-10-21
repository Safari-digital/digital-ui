import React from 'react';
import FormField, { type FormFieldProps } from './FormField';

interface FormState extends Omit<FormFieldProps, 'value' | 'onChange'> {
    id: string;
    default: string;
}

export default function useForm(values: Array<FormState>) {
    const [state, dispatch] = React.useReducer(
        (state: Record<string, string>, action: Record<string, string>) => ({ ...state, ...action }),
        values.reduce((acc, curr) => ({ ...acc, [curr.id]: curr.default }), {}),
    );

    const fields: Array<FormFieldProps> = React.useMemo(
        () =>
            values.map(({ id, default: _, ...rest }) => ({
                value: state[id],
                onChange: (value: string) => dispatch({ [id]: value }),
                id,
                ...rest,
            })),
        [state, values],
    );

    const renderFields = React.useCallback(
        () => fields.map(({ id, ...rest }) => <FormField {...rest} key={id} />),
        [fields],
    );

    return {
        fields,
        renderFields,
    };
}
