import { FormCheckboxProps } from "@/components/common/FormBuilder/FormField/types";

const FormCheckbox: React.FC<FormCheckboxProps> = (props) => {
  const { commonProps } = props;
  const { className, ...fieldProps } = commonProps;
  return <input type="checkbox" className={className} {...fieldProps} />;
};

export default FormCheckbox;
