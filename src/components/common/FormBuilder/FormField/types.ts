import {
  FormSelectOption,
  TextFieldType,
  FormFieldCommonProps,
  FormFieldValue,
  FieldConfig,
} from "@/components/common/FormBuilder/FormConfig";

export interface FormFieldProps {
  field: FieldConfig;
  value: FormFieldValue;
  onChange: (field: FieldConfig, value: FormFieldValue) => void;
  isError?: boolean;
  errorMessage?: string;
}
interface FormFieldElementProps {
  commonProps: FormFieldCommonProps;
}

export interface FormSelectProps extends FormFieldElementProps {
  options?: FormSelectOption[];
}
export interface FormCheckboxProps extends FormFieldElementProps {}

export interface FormTextAreaProps extends FormFieldElementProps {}
export interface FormTextProps extends FormFieldElementProps {
  type: TextFieldType;
}
