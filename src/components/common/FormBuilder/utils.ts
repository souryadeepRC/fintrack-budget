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
/**
 * Determines whether the given `record` form state differs from one or more baseline form states.
 *
 * This function compares a single form state (`record`) against one or more comparator states (`comparators`).
 * It returns `true` if the `record` is considered altered (i.e., not equal to any of the comparator states),
 * and `false` if it matches at least one of them.
 *
 * @param record - The current form state to evaluate.
 * @param comparators - A non-empty array of baseline form states to compare against.
 * @returns `true` if `record` is different from all comparators, otherwise `false`.
 */
const isFormAltered = (
  record: FormStateType,
  comparators: [FormStateType, ...FormStateType[]]
): boolean => {
  const compareRecord = (comparator: FormStateType): boolean => {
    const allKeys = new Set([
      ...Object.keys(comparator),
      ...Object.keys(record),
    ]);
    return Array.from(allKeys).some((key) => comparator[key] !== record[key]);
  };
  return comparators.some((comparator) => {
    return compareRecord(comparator);
  });
};
/**
 * Trims leading and trailing whitespace from all string values in the given form state.
 *
 * This utility function iterates through each key-value pair in the form state object.
 * If the value is a string, it applies `String.prototype.trim()` to remove any extra
 * spaces from the beginning and end. Non-string values are returned unchanged.
 *
 * @param formState - An object representing form field values, where each key maps to a value of any type.
 * @returns A new object with the same structure as `formState`, but with all string values trimmed.
 *
 * @example
 * const form = {
 *   name: "  Alice ",
 *   age: 25,
 *   comment: " Hello! "
 * };
 *
 * const trimmed = trimFormValues(form);
 * // Result:
 * // {
 * //   name: "Alice",
 * //   age: 25,
 * //   comment: "Hello!"
 * // }
 */
const trimFormValues = (
  formState: Record<string, FormFieldValue>
): Record<string, FormFieldValue> => {
  const trimmedState: Record<string, FormFieldValue> = {};

  for (const key in formState) {
    const value = formState[key];

    if (typeof value === "string") {
      trimmedState[key] = value.trim();
    } else {
      trimmedState[key] = value;
    }
  }

  return trimmedState;
};

export {
  initializeErrorState,
  updateErrorState,
  validateForm,
  isFieldEmpty,
  isFormAltered,
  trimFormValues,
};
