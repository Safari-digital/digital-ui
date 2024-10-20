import BaseComponent from './Form';
import Field from './FormField';

export type { FormProps } from './Form';
export type { FormFieldProps } from './FormField';
export const Form = Object.assign(BaseComponent, { Field });
