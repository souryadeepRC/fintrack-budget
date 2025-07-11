import "./FormField.scss";
type FieldType = "text" | "number" | "date" | "select" | "textarea";

interface Option {
  label: string;
  value: string;
}

interface FormFieldProps {
  mandatory?: boolean;
  name: string;
  label: string;
  type: FieldType;
  value: string;
  onChange: (name: string, value: string) => void;
  error?: string;
  options?: Option[]; // Only for select
}

const FormField: React.FC<FormFieldProps> = ({
  mandatory = false,
  name,
  label,
  type = "text",
  value,
  onChange,
  error,
  options = [],
}) => {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    onChange(name, e.target.value);
  };

  return (
    <div className="form_item__group">
      <label
        className={`form__label ${mandatory ? "mandatory" : ""}`}
        htmlFor={name}
      >
        {label}
      </label>
      {type === "textarea" && (
        <textarea
          className={`form__input ${error ? "error" : ""}`}
          id={name}
          value={value}
          onChange={handleChange}
        />
      )}
      {type === "select" && (
        <select
          className="form__select"
          id={name}
          value={value}
          onChange={handleChange}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {(type === "text" || type === "date" || type === "number") && (
        <input
          className={`form__input ${error ? "error" : ""}`}
          id={name}
          type={type}
          value={value}
          onChange={handleChange}
        />
      )}

      {error && <p className="error__msg">{error}</p>}
    </div>
  );
};

export default FormField;
