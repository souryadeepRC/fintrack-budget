import { FieldConfig, FormErrorStateType, FormStateType } from "./FormConfig";
import {
  initializeErrorState,
  isFieldEmpty,
  isFormAltered,
  updateErrorState,
  validateForm,
} from "./utils";

const mockFormFields: FieldConfig[] = [
  {
    name: "title",
    label: "Title",
    type: "text",
    isRequired: true,
    validate: (title: string): string | undefined => {
      if (title.length < 5) return "title can not be less than 5 letters";
      if (title.length > 10) return "title can not be more than 10 letters";
    },
  },
  {
    name: "description",
    label: "Description",
    type: "text",
    isRequired: true,
  },
  {
    name: "amount",
    label: "Amount",
    type: "text",
    isRequired: true,
    validate: (amount: string): string | undefined => {
      const regex = /^\d+(\.\d{1,2})?$/;
      if (!regex.test(amount)) return "Provide a valid amount";
    },
  },
  {
    name: "note",
    label: "Note",
    type: "text",
  },
  {
    name: "category",
    label: "Category",
    type: "text",
    isRequired: false,
  },
];

describe("FormBuilder Util functions", () => {
  it("validate initializeErrorState method", () => {
    const errorState = initializeErrorState(mockFormFields);
    expect(errorState).toEqual({
      title: "",
      description: "",
      amount: "",
    });
  });
  it("validate updateErrorState method", () => {
    const errorState = {
      title: "",
      description: "",
      amount: "",
    };
    const errorCallback = function (...args: any) {
      return updateErrorState.apply(undefined, args)(errorState);
    };
    expect(updateErrorState(mockFormFields[0], "Test")(errorState)).toEqual({
      ...errorState,
      title: "title can not be less than 5 letters",
    });

    expect(errorCallback(mockFormFields[0], "Test1234Extra")).toEqual({
      ...errorState,
      title: "title can not be more than 10 letters",
    });

    expect(errorCallback(mockFormFields[0], "Test1234Extra")).toEqual({
      ...errorState,
      title: "title can not be more than 10 letters",
    });
    expect(errorCallback(mockFormFields[0], "Test1234")).toEqual(errorState);

    expect(errorCallback(mockFormFields[1], "")).toEqual({
      ...errorState,
      description: "Description is required",
    });
    expect(errorCallback(mockFormFields[2], "Test")).toEqual({
      ...errorState,
      amount: "Provide a valid amount",
    });
    expect(errorCallback(mockFormFields[2], "1e0")).toEqual({
      ...errorState,
      amount: "Provide a valid amount",
    });
  });
  it("check validateForm method", () => {
    function checkValidation(...args: [FormStateType, FormErrorStateType]) {
      return validateForm.apply(null, [mockFormFields, ...args]);
    }
    const validFormState = {
      title: "Test123",
      description: "Sample",
      amount: "123",
    };
    const initialErrorState = { title: "", description: "", amount: "" };
    expect(checkValidation(validFormState, initialErrorState)).toEqual({
      isInValid: false,
      errorState: initialErrorState,
    });
    expect(
      checkValidation(
        {
          ...validFormState,
          title: "Test1234Extra",
        },
        initialErrorState
      )
    ).toEqual({
      isInValid: true,
      errorState: {
        ...initialErrorState,
        title: "title can not be more than 10 letters",
      },
    });

    expect(
      checkValidation(
        {
          title: "Test1234Extra",
          amount: "1e2",
          description: "",
        },
        { ...initialErrorState, title: "Random Error" }
      )
    ).toEqual({
      isInValid: true,
      errorState: {
        ...initialErrorState,
        title: "title can not be more than 10 letters",
        amount: "Provide a valid amount",
        description: "Description is required",
      },
    });

    expect(
      checkValidation(
        {
          description: "Sample Description",
        },
        { ...initialErrorState, title: "Random Error" }
      )
    ).toEqual({
      isInValid: true,
      errorState: {
        ...initialErrorState,
        title: "Title is required",
        amount: "Amount is required",
        description: "",
      },
    });

    expect(
      checkValidation(validFormState, {
        ...initialErrorState,
        title: "Title is required",
      })
    ).toEqual({
      isInValid: false,
      errorState: initialErrorState,
    });
    expect(
      checkValidation(
        {
          ...validFormState,
          personalDetails: "Sample Description",
        },
        { ...initialErrorState, title: "Random Error" }
      )
    ).toEqual({
      isInValid: true,
      errorState: initialErrorState,
    });
  });
  it("check isFieldEmpty", () => {
    expect(isFieldEmpty("null")).toBe(true);
    expect(isFieldEmpty("undefined")).toBe(true);
    expect(isFieldEmpty("")).toBe(true);
    expect(isFieldEmpty("   ")).toBe(true);
    expect(isFieldEmpty("Hello")).toBe(false);
    expect(isFieldEmpty(0)).toBe(false);
    expect(isFieldEmpty(123)).toBe(false);
  });
  it("validate isFormAltered method", () => {
    const emptyRecord = {
      title: "",
      description: "",
      amount: 0,
    };
    const filledRecord = {
      title: "Test",
      description: "",
      amount: 0,
    };
    const formValue = {
      title: "Test",
      description: "Sample",
      amount: 100,
    };

    expect(isFormAltered(formValue, [emptyRecord])).toEqual(true);
    expect(isFormAltered(formValue, [emptyRecord, filledRecord])).toEqual(true);
    expect(isFormAltered(emptyRecord, [emptyRecord])).toEqual(false);
    expect(isFormAltered(formValue, [filledRecord])).toEqual(true);

    expect(
      isFormAltered({ ...formValue, category: "Others" }, [filledRecord])
    ).toEqual(true);
    expect(
      isFormAltered(formValue, [{ ...filledRecord, category: "Others" }])
    ).toEqual(true);
    expect(
      isFormAltered(formValue, [
        emptyRecord,
        { ...filledRecord, category: "Others" },
      ])
    ).toEqual(true);
  });
});
