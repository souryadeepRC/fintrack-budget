import { FormCheckboxProps } from "@/components/common/FormBuilder/FormField/types";

const FormCheckbox: React.FC<FormCheckboxProps> = (props) => {
  const { commonProps } = props;
  const { className, value, ...fieldProps } = commonProps;
  return (
    <input
      type="checkbox"
      className={className}
      checked={value as boolean}
      {...fieldProps}
    />
  );
};

export default FormCheckbox;
