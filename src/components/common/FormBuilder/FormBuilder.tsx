import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { AlertDialog, Button } from "@/components/common";
import {
  FieldConfig,
  FormBuilderProps,
  FormErrorStateType,
  FormStateType,
} from "@/components/common/FormBuilder/FormConfig";
import {
  initializeErrorState,
  updateErrorState,
  validateForm,
} from "@/components/common/FormBuilder/utils";
import { FormField } from "@/components/common/FormBuilder/FormField";
import "./FormBuilder.scss";

const FormBuilder: React.FC<FormBuilderProps> = (props) => {
  const {
    defaultValues = {},
    values = {},
    title,
    fields,
    onSubmit,
    actionBtnLabel = "Submit",
  } = props;
  const navigate = useNavigate();
  const [isLeaving, setIsLeaving] = useState<boolean>(false);
  const [formState, setFormState] = useState<FormStateType>(defaultValues);
  const [errorState, setErrorState] = useState<FormErrorStateType>(
    initializeErrorState(fields)
  );

  useEffect(() => {
    setFormState(values);
  }, [values]);

  const handleChange = (field: FieldConfig, value: any) => {
    setFormState((prev) => ({ ...prev, [field.name]: value }));
    setErrorState(updateErrorState(field, value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateForm(fields, formState, errorState);
    setErrorState(result.errorState);
    if (result.isInValid) {
      return;
    }
    onSubmit(formState);
  };

  const toggleIsLeaving = () => {
    setIsLeaving((isLeaving) => !isLeaving);
  };
  const onFormLeave = () => {
    navigate(-1);
  };

  const onClear = (e: any) => {
    e.preventDefault();
    setFormState(defaultValues);
  };

  return (
    <div className="from_wrapper__container">
      <AlertDialog
        isOpen={isLeaving}
        onClose={toggleIsLeaving}
        message="Do you really want to leave from here?"
        actions={[
          {
            label: "Yes",
            onClick: onFormLeave,
          },
          {
            label: "Cancel",
            variant: "text",
            onClick: toggleIsLeaving,
          },
        ]}
      />

      <div className="from_wrapper__header">
        <Button onClick={toggleIsLeaving}>Back</Button>
        <h4>{title}</h4>
      </div>
      <form onSubmit={handleSubmit} className="form__container">
        <div className="form__inputs">
          {fields.map((field) => (
            <FormField
              key={field.name}
              field={field}
              value={formState[field.name]}
              onChange={handleChange}
              isError={Boolean(errorState[field.name])}
              errorMessage={errorState[field.name]}
            />
          ))}
        </div>
        <div className="form__actions">
          <Button type="submit">{actionBtnLabel}</Button>
          <Button onClick={onClear}>Clear</Button>
        </div>
      </form>
    </div>
  );
};

export default FormBuilder;
