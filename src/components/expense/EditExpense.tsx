import { RootState } from "@/store";
import { selectExpense } from "@/store/expenseReducer/expenseSelectors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useMutation } from "@tanstack/react-query";

import expenseDBService from "@/service/Expense";
import { useSettings } from "@/hooks";
import { ExpenseState } from "@/types/expense";
import { toast } from "sonner";
import { editExpense } from "@/store/expenseReducer/expenseReducer";
import { formatIsoToDate } from "@/utils";
import FormBuilder from "@/components/common/FormBuilder/FormBuilder";
import {
  FieldConfig,
  FormFieldType,
} from "@/components/common/FormBuilder/FormConfig";

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
  const dispatch = useDispatch();
  const { mutate } = useMutation({
    mutationFn: (expense: ExpenseState) =>
      expenseDBService.storeExpense(expense),
    onSuccess: function (response: ExpenseState) {
      dispatch(editExpense(response));
      toast.success(`Expense added under Category: ${response.category}`);
      setTimeout(() => navigate("/expense"), 0);
    },
    onError: function () {
      toast.error(`Failed to add expense`);
    },
  });

  const options = useSettings();
  const [details, setDetails] = useState<ExpenseDetailsState>(initialState);

  const { expenseId } = useParams<{ expenseId: string }>();
  const expense = useSelector((state: RootState) =>
    expenseId ? selectExpense(state, expenseId) : undefined
  );
  const navigate = useNavigate();

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
    mutate({
      id: expenseId,
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
    { name: "note", label: "Note", type: FormFieldType.TEXTAREA },
  ];
  return (
    <FormBuilder
      title={`${expenseId ? "Edit" : "Add"} Expense`}
      defaultValues={initialState}
      values={details}
      fields={formFields}
      onSubmit={onSave}
      actionBtnLabel={expenseId ? "Save" : "Create"}
    />
  );
};

export default EditExpense;
