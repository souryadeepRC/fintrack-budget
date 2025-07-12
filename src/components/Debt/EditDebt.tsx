import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";

import { useSettings } from "@/hooks";
import { DebtCategoryType, DebtState, DebtStatusType } from "@/types/debt";
import { formatIsoToDate } from "@/utils";
import FormBuilder from "@/components/common/FormBuilder/FormBuilder";
import {
  FieldConfig,
  FormFieldType,
} from "@/components/common/FormBuilder/FormConfig";
import {
  DebtCategory,
  DebtCategoryMap,
  debtCategoryOptions,
  DebtStatus,
  DebtStatusMap,
  debtStatusOptions,
} from "./DebtConfig";
import { EntryContext } from "@/types";

type DebtDetailsState = {
  title: string;
  amount: string;
  category: string; // e.g. Food, entertainment
  date: string;
  mode: string; // Payment Mode e.g. creditCard, cash
  note: string;
  name: string;
  dueDate?: string;
  status: DebtStatusType;
  clearedAmount: string;
};
const initialState = {
  title: "",
  amount: "",
  category: DebtCategory.LEND,
  date: "",
  mode: "Gpay",
  status: DebtStatus.UNPAID,
  clearedAmount: "",
  name: "",
  dueDate: "",
  note: "",
};
const EditDebt = () => {
  const context: EntryContext = useOutletContext();
  const debt = context.activeEntry as DebtState;

  const options = useSettings();
  const [details, setDetails] = useState<DebtDetailsState>(initialState);

  useEffect(() => {
    if (!debt) return;
    const { id, ...restDebt } = debt;
    setDetails({
      ...restDebt,
      amount: `${debt.amount}`,
      clearedAmount: `${debt.clearedAmount}`,
      date: formatIsoToDate(debt.date),
      dueDate: formatIsoToDate(debt.dueDate || ""),
    });
  }, [debt]);

  const onSave = (response: any) => {
    context.actions?.modify?.({
      id: debt?.id || "",
      ...response,
      amount: Number(response.amount),
      clearedAmount: Number(response.clearedAmount),
    });
  };

  const formFields: FieldConfig[] = [
    {
      name: "title",
      label: "Title",
      type: FormFieldType.TEXT,
      isRequired: true,
      validate: (title: string): string | undefined => {
        if (title.length > 20) return "title can not be more than 20 letters";
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
    {
      name: "category",
      label: "Category",
      type: FormFieldType.SELECT,
      isRequired: true,
      options: debtCategoryOptions,
      validate: (category: DebtCategoryType): string | undefined => {
        if (!DebtCategoryMap.get(category)) return "Choose from the list";
      },
    },
    { name: "date", label: "Date", type: FormFieldType.DATE, isRequired: true },
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
    { name: "name", label: "Name", type: FormFieldType.TEXT },
    { name: "dueDate", label: "Due Date", type: FormFieldType.DATE },
    {
      name: "status",
      label: "Status",
      type: FormFieldType.SELECT,
      isRequired: true,
      options: debtStatusOptions,
      validate: (status: DebtStatusType): string | undefined => {
        if (!DebtStatusMap.get(status)) return "Choose from the list";
      },
    },
    {
      name: "clearedAmount",
      label: "Cleared Amount",
      type: FormFieldType.NUMBER,
      validate: (amount: string): string | undefined => {
        const regex = /^\d+(\.\d{1,2})?$/;
        if (!regex.test(amount)) return "Provide a valid amount";
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
      title={`${debt?.id ? "Edit" : "Add"} Debt`}
      defaultValues={initialState}
      values={details}
      fields={formFields}
      onSubmit={onSave}
      isSuccess={context.sideEffects?.modify?.isSuccess}
      onSuccess={context.sideEffects?.modify?.success}
      actionBtnLabel={debt?.id ? "Save" : "Create"}
    />
  );
};

export default EditDebt;
