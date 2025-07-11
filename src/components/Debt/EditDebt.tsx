import { RootState } from "@/store";
import { selectDebt } from "@/store/debtReducer/debtSelectors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useMutation } from "@tanstack/react-query";

import debtDBService from "@/service/Debt";
import { useSettings } from "@/hooks";
import { DebtCategoryType, DebtState, DebtStatusType } from "@/types/debt";
import { toast } from "sonner";
import { editDebt } from "@/store/debtReducer/debtReducer";
import { formatIsoToDate } from "@/utils";
import FormBuilder from "@/components/common/FormBuilder/FormBuilder";
import {
  FieldConfig,
  FormFieldType,
} from "@/components/common/FormBuilder/FormConfig";
import {
  DebtCategoryMap,
  debtCategoryOptions,
  DebtStatusMap,
  debtStatusOptions,
} from "./DebtConfig";

type DebtDetailsState = {
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
  status: "Unpaid",
  clearedAmount: "",
  name: "",
  dueDate: "",
  note: "",
};
const EditDebt = () => {
  const dispatch = useDispatch();
  const { mutate } = useMutation({
    mutationFn: (debt: DebtState) => debtDBService.storeDebt(debt),
    onSuccess: function (response: DebtState) {
      dispatch(editDebt(response));
      toast.success(`Debt added under Category: ${response.category}`);
      setTimeout(() => navigate("/debt"), 0);
    },
    onError: function () {
      toast.error(`Failed to add debt`);
    },
  });

  const options = useSettings();
  const [details, setDetails] = useState<DebtDetailsState>(initialState);

  const { debtId } = useParams<{ debtId: string }>();
  const debt = useSelector((state: RootState) =>
    debtId ? selectDebt(state, debtId) : undefined
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!debt) return;
    const { id, ...restDebt } = debt;
    setDetails({
      ...restDebt,
      amount: `${debt.amount}`,
      date: formatIsoToDate(debt.date),
    });
  }, [debt]);

  const onSave = (response: any) => {
    mutate({
      id: debtId,
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
    { name: "note", label: "Note", type: FormFieldType.TEXTAREA },
  ];
  return (
    <FormBuilder
      title={`${debtId ? "Edit" : "Add"} Debt`}
      defaultValues={initialState}
      values={details}
      fields={formFields}
      onSubmit={onSave}
      actionBtnLabel={debtId ? "Save" : "Create"}
    />
  );
};

export default EditDebt;
