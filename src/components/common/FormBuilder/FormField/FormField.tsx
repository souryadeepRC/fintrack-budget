import {
  FormFieldType,
  TextFieldType,
  FormElement,
  FormFieldCommonProps,
} from "@/components/common/FormBuilder/FormConfig";
import {
  FormTextArea,
  FormSelect,
  FormCheckbox,
  FormText,
} from "@/components/common/FormBuilder/FormField";
import { FormFieldProps } from "@/components/common/FormBuilder/FormField/types";
import "./FormField.scss";

const FormFieldInput: React.FC<FormFieldProps> = (props) => {
  const { field, value, onChange: onFieldChange, isError } = props;
  const isCheckbox: boolean = field.type === FormFieldType.CHECKBOX;
  const commonProps: FormFieldCommonProps = {
    name: field.name,
    value,
    onChange: (e: React.ChangeEvent<FormElement>) => {
      const value = isCheckbox
        ? (e.target as HTMLInputElement).checked
        : e.target.value;

      onFieldChange(field, value);
    },
    ...(isCheckbox && {
      checked: !!value,
    }),
    placeholder: field.placeholder,
    className: `form__field ${isError ? "field__error" : ""}`,
  };
  if (field.type === FormFieldType.SELECT) {
    return <FormSelect commonProps={commonProps} options={field.options} />;
  }
  if (field.type === FormFieldType.TEXTAREA) {
    return <FormTextArea commonProps={commonProps} />;
  }
  if (field.type === FormFieldType.CHECKBOX) {
    return <FormCheckbox commonProps={commonProps} />;
  }
  if (
    field.type === FormFieldType.TEXT ||
    field.type === FormFieldType.DATE ||
    field.type === FormFieldType.NUMBER
  ) {
    return (
      <FormText commonProps={commonProps} type={field.type as TextFieldType} />
    );
  }
  return null;
};

const FormField: React.FC<FormFieldProps> = (props) => {
  const { errorMessage = "", ...inputProps } = props;
  return (
    <div className="form_item__group">
      <label
        className={`form__label ${props.field.isRequired ? "required" : ""}`}
      >
        {props.field.label}
      </label>
      <FormFieldInput {...inputProps} />
      {errorMessage && <p className="error__msg">{errorMessage}</p>}
    </div>
  );
};
export default FormField;
