import FormField from './FormField';
import Form from './Form';

export type { FormFieldProps } from './FormField';
export type { FormProps } from './Form';

export default Object.assign(Form, { Field: FormField });
