import {
  FieldConfig,
  FormErrorStateType,
  FormFieldValue,
  FormStateType,
} from "@/components/common/FormBuilder/FormConfig";

const initializeErrorState = (fields: FieldConfig[]): FormErrorStateType => {
  const error: FormErrorStateType = fields.reduce(
    (acc: FormErrorStateType, field: FieldConfig) => {
      if (!field.isRequired && !field?.validate) return acc;
      return {
        ...acc,
        [field.name]: "",
      };
    },
    {}
  );
  return error;
};
const isFieldEmpty = (value: FormFieldValue) => {
  return (
    value === null ||
    value === "null" ||
    value === undefined ||
    value === "undefined" ||
    (typeof value === "string" && value.trim() === "")
  );
};
const fetchFieldError = (field: FieldConfig, value: FormFieldValue) => {
  // Required field and empty
  if (field.isRequired && isFieldEmpty(value)) {
    return `${field.label} is required`;
  }

  // Custom validation function
  if (field.validate) {
    const result = field.validate(value);
    if (result) return result;
  }

  // No error
  return "";
};
const updateErrorState =
  (field: FieldConfig, value: any) =>
  (errorState: FormErrorStateType): FormErrorStateType => {
    // if that field don't have any validation
    if (!Object.prototype.hasOwnProperty.call(errorState, field.name))
      return errorState;

    return {
      ...errorState,
      [field.name]: fetchFieldError(field, value),
    };
    /*  // if the field have required validation and field is empty
    if (field.isRequired && !value) {
      return {
        ...errorState,
        [field.name]: `${field.label} is required`,
      };
    }
    // if the field have specific validation
    if (field?.validate) {
      const validatedResult = field.validate(value);

      if (validatedResult) {
        return {
          ...errorState,
          [field.name]: validatedResult,
        };
      }
    }
    return errorState; */
  };

// This method returns true if the form has any error prone field value present
type FieldValidationMap = {
  result: Map<boolean, string>;
  updatedErrorState: FormErrorStateType;
};
const validateForm = (
  fields: FieldConfig[],
  formState: FormStateType,
  errorState: FormErrorStateType
): {
  errorState: FormErrorStateType;
  isInValid: boolean;
} => {
  const validationMap: FieldValidationMap = fields.reduce(
    (acc: FieldValidationMap, field: FieldConfig) => {
      const { name = "" } = field;
      /* if (!Object.prototype.hasOwnProperty.call(formState, name)) {
        acc.result.set(true, name);
        return acc;
      } */

      const modifiedErrorState = updateErrorState(
        field,
        formState[name]
      )(acc.updatedErrorState);
      acc.updatedErrorState = {
        ...acc.updatedErrorState,
        ...modifiedErrorState,
      };
      acc.result.set(Boolean(modifiedErrorState[name]), name);

      return acc;
    },
    { result: new Map(), updatedErrorState: errorState }
  );

  const allowedKeys = new Set(fields.map((field) => field.name));
  const isUnknownState: boolean =
    Object.keys(formState).filter((key) => !allowedKeys.has(key)).length > 0;
  return {
    errorState: validationMap.updatedErrorState,
    isInValid: isUnknownState || validationMap.result.has(true),
  };
};

export { initializeErrorState, updateErrorState, validateForm, isFieldEmpty };
