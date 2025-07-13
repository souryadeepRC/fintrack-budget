export type FieldType =
  | "text"
  | "number"
  | "date"
  | "select"
  | "textarea"
  | "checkbox";

export type TextFieldType = "text" | "date" | "number" | "password";

// Optional: Create a reusable object for enum-like access
export const TextFieldTypes: Record<Uppercase<TextFieldType>, TextFieldType> = {
  TEXT: "text",
  DATE: "date",
  NUMBER: "number",
  PASSWORD: "password",
};
export const FormFieldType: Record<Uppercase<FieldType>, FieldType> = {
  TEXT: "text",
  NUMBER: "number",
  DATE: "date",
  SELECT: "select",
  TEXTAREA: "textarea",
  CHECKBOX: "checkbox",
};
export type FormSelectOption = { label: string; value: string | number };
export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  isNonEditable?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  placeholder?: string;
  validate?: (value: any) => string | undefined;
  options?: FormSelectOption[]; // for select
}

export interface FormBuilderProps {
  title: string;
  fields: FieldConfig[];
  onSubmit: (data: Record<string, any>) => void;
  defaultValues?: Record<string, any>;
  values?: Record<string, any>;
  actionBtnLabel?: string;
  isSuccess?: boolean;
  onSuccess?: () => void;
}
export type FormFieldValue = string | number | boolean;
export type FormErrorStateType = Record<string, string>;
export type FormStateType = Record<string, FormFieldValue>;

export type FormElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;
export interface FormFieldCommonProps {
  name: string;
  value: string | number | boolean;
  onChange: (e: React.ChangeEvent<FormElement>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  checked?: boolean; // Only applicable for checkboxes
}
