import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";

import { useSettings } from "@/hooks";
import { ExpenseState } from "@/types/expense";
import { formatIsoToDate } from "@/utils";
import FormBuilder from "@/components/common/FormBuilder/FormBuilder";
import {
  FieldConfig,
  FormFieldType,
} from "@/components/common/FormBuilder/FormConfig";
import { EntryContext } from "@/types";

type ExpenseDetailsState = {
  title: string;
  amount: string;
  category: string; // e.g. Food, entertainment
  date: string;
  mode: string; // Payment Mode e.g. creditCard, cash
  note: string;
};
const initialState = {
  title: "",
  amount: "",
  category: "Miscellaneous",
  date: "",
  mode: "Gpay",
  note: "",
};
const EditExpense = () => {
  const context: EntryContext = useOutletContext();
  const expense = context.activeEntry as ExpenseState;

  const options = useSettings();
  const [details, setDetails] = useState<ExpenseDetailsState>(initialState);

  useEffect(() => {
    if (!expense) return;
    const { id, ...restExpense } = expense;
    setDetails({
      ...restExpense,
      amount: `${expense.amount}`,
      date: formatIsoToDate(expense.date),
    });
  }, [expense]);

  const onSave = (response: any) => {
    context.actions?.modify?.({
      id: expense?.id || "",
      ...response,
      amount: Number(response.amount),
    });
  };

  const formFields: FieldConfig[] = [
    {
      name: "title",
      label: "Title",
      type: FormFieldType.TEXT,
      isRequired: true,
      validate: (title: string): string | undefined => {
        if (title.length > 20) return "Title can not be more than 20 letters";
      },
    },
    {
      name: "amount",
      label: "Amount",
      type: FormFieldType.NUMBER,
      isRequired: true,
      validate: (amount: string): string | undefined => {
        const regex = /^\d+(\.\d{1,2})?$/;
        if (!regex.test(amount)) return "Provide a valid amount";
      },
    },
    { name: "date", label: "Date", type: FormFieldType.DATE, isRequired: true },
    {
      name: "category",
      label: "Category",
      type: FormFieldType.SELECT,
      isRequired: true,
      options: options.expenseCategories,
      validate: (category: string): string | undefined => {
        if (!options.ExpenseCategoryMap.get(category))
          return "Choose from the list";
      },
    },
    {
      name: "mode",
      label: "Payment Mode",
      type: FormFieldType.SELECT,
      isRequired: true,
      options: options.paymentModes,
      validate: (mode: string): string | undefined => {
        if (!options.PaymentModeMap.get(mode)) return "Choose from the list";
      },
    },
    {
      name: "note",
      label: "Note",
      type: FormFieldType.TEXTAREA,
      validate: (note: string): string | undefined => {
        if (note.length > 150) return "Note can not be more than 150 letters";
      },
    },
  ];
  return (
    <FormBuilder
      title={`${expense?.id ? "Edit" : "Add"} Expense`}
      defaultValues={initialState}
      values={details}
      fields={formFields}
      onSubmit={onSave}
      isSuccess={context.sideEffects?.modify?.isSuccess}
      onSuccess={context.sideEffects?.modify?.success}
      actionBtnLabel={expense?.id ? "Save" : "Create"}
    />
  );
};

export default EditExpense;
