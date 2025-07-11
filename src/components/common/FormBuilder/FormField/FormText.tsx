import { FormTextProps } from "@/components/common/FormBuilder/FormField/types";

const FormText: React.FC<FormTextProps> = (props) => {
  const { commonProps, type } = props;
  const { className, value, ...fieldProps } = commonProps;
  return (
    <input
      className={`${className} form__text`}
      type={type}
      {...fieldProps}
      value={value as string | number}
    />
  );
};

export default FormText;
