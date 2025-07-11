import { FormSelectOption } from "@/components/common/FormBuilder/FormConfig";
import { FormSelectProps } from "@/components/common/FormBuilder/FormField/types";

const FormSelect: React.FC<FormSelectProps> = (props) => {
  const { commonProps, options } = props;
  const { className, value, ...fieldProps } = commonProps;
  return (
    <>
      <select
        className={`${className} form__select`}
        {...fieldProps}
        value={value as string | number}
      >
        {options?.map((opt: FormSelectOption) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default FormSelect;
