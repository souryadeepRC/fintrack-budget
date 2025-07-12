import { FormDateProps } from "@/components/common/FormBuilder/FormField/types";
import { useRef } from "react";

const FormDate: React.FC<FormDateProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.showPicker?.();
    inputRef.current?.focus();
  };
  const { commonProps } = props;
  const { className, value, ...fieldProps } = commonProps;
  return (
    <input
      onClick={handleClick}
      className={`${className} form_date__input`}
      type="date"
      {...fieldProps}
      value={value as string | number}
      ref={inputRef}
    />
  );
};

export default FormDate;
