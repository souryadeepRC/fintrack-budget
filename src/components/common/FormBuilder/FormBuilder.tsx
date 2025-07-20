import { useCallback, useEffect, useState } from "react";
import { useBlocker, useNavigate } from "react-router";

import { FaArrowLeft, FaLock } from "react-icons/fa";
import { AlertDialog, Button } from "@/components/common";
import {
  FieldConfig,
  FormBuilderProps,
  FormErrorStateType,
  FormStateType,
} from "@/components/common/FormBuilder/FormConfig";
import {
  initializeErrorState,
  trimFormValues,
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
    onValidSubmit,
    actionBtnLabel = "Submit",
    isSuccess,
    onSuccess,
  } = props;
  const navigate = useNavigate();
  const [formState, setFormState] = useState<FormStateType>(defaultValues);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<FormErrorStateType>(
    initializeErrorState(fields)
  );
  let blocker = useBlocker(useCallback(() => isDirty, [isDirty]));

  useEffect(() => {
    if (!isSuccess) return;
    isDirty ? setIsDirty(false) : onSuccess?.();
  }, [isSuccess, isDirty]);

  useEffect(() => {
    setFormState(values);
  }, [values]);

  const handleChange = (field: FieldConfig, value: any) => {
    setFormState((prev) => ({ ...prev, [field.name]: value }));
    setErrorState(updateErrorState(field, value));
    !isDirty && setIsDirty(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateForm(fields, formState, errorState);
    setErrorState(result.errorState);
    if (result.isInValid) {
      return;
    }
    if (onValidSubmit && !onValidSubmit(formState)) {
      return;
    }
    onSubmit(trimFormValues(formState));
  };

  const performBackNavigation = () => {
    navigate(-1);
  };

  const onClear = (e: any) => {
    e.preventDefault();
    setFormState(defaultValues);
  };

  const hasMandatoryField: boolean = fields.some((field) => field.isRequired);
  const hasNonEditableField: boolean = fields.some(
    (field) => field.isNonEditable
  );
  return (
    <div className="from_wrapper__container">
      <form onSubmit={handleSubmit} className="form__container">
        {blocker.state === "blocked" && (
          <AlertDialog
            isOpen={true}
            onClose={() => blocker.reset()}
            message="Are you sure you want to leave?"
            actions={[
              {
                label: "Yes",
                onClick: () => blocker.proceed(),
              },
              {
                label: "Cancel",
                variant: "text",
                onClick: () => blocker.reset(),
              },
            ]}
          />
        )}
        <div className="from_wrapper__header">
          <Button
            onClick={performBackNavigation}
            variant="curve"
            startIcon={<FaArrowLeft />}
          >
            <></>
          </Button>
          <h4>{title}</h4>
        </div>
        <div className="form__notes">
          {hasNonEditableField && (
            <p>
              Fields marked with&nbsp;
              <FaLock style={{ verticalAlign: "middle" }} />
              &nbsp; are not editable after submission
            </p>
          )}
          {hasMandatoryField && <p>Fields marked with * are mandatory</p>}
        </div>
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
