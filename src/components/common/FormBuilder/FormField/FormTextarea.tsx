import { FormTextAreaProps } from "@/components/common/FormBuilder/FormField/types";

const FormTextArea: React.FC<FormTextAreaProps> = (props) => {
  const { commonProps } = props;
  const { className, value, ...fieldProps } = commonProps;
  return (
    <textarea
      className={className}
      {...fieldProps}
      value={value as string | number}
    />
  );
};

export default FormTextArea;
