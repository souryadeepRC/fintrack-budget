import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";

import { NotificationState } from "@/types/notification";
import { formatIsoToDate } from "@/utils";
import FormBuilder from "@/components/common/FormBuilder/FormBuilder";
import {
  FieldConfig,
  FormFieldType,
} from "@/components/common/FormBuilder/FormConfig";
import { EntryContext } from "@/types";
import AppConstants from "@/constants";

type NotificationDetailsState = {
  title: string;
  note: string;
  amount?: string;
  expiryDate: string;
  category: string;
  mode: string;
  period: string;
};
const initialState = {
  title: "",
  note: "",
  amount: "",
  expiryDate: "",
  category: "Miscellaneous",
  mode: "GPay",
  period: "",
};
const EditNotification = () => {
  const context: EntryContext = useOutletContext();
  const notification = context.activeEntry as NotificationState;

  const [details, setDetails] =
    useState<NotificationDetailsState>(initialState);

  useEffect(() => {
    if (!notification) return;
    const { id, ...restNotification } = notification;
    setDetails({
      ...restNotification,
      amount: `${notification.amount === 0 ? "" : notification.amount}`,
      period: `${notification.period === 0 ? "" : notification.period}`,
      expiryDate: formatIsoToDate(notification.expiryDate),
    });
  }, [notification]);

  const onSave = (response: any) => {
    context.actions?.modify?.({
      id: notification?.id || "",
      ...response,
      amount: Number(response.amount),
      period: Number(response.period),
    });
  };

  const formFields: FieldConfig[] = [
    {
      name: "title",
      label: "Title",
      type: FormFieldType.TEXT,
      isRequired: true,
      isNonEditable: true,
      ...(notification?.id && { isDisabled: true }),
      validate: (title: string): string | undefined => {
        if (title.length > 20) return "Title can not be more than 20 letters";
      },
    },
    {
      name: "note",
      label: "Note",
      isRequired: false,
      type: FormFieldType.TEXTAREA,
      validate: (note: string): string | undefined => {
        if (note.length > 150) return "Note can not be more than 150 letters";
      },
    },
    {
      name: "amount",
      label: "Amount",
      type: FormFieldType.NUMBER,
      validate: (amount: string): string | undefined => {
        const regex = /^\d+(\.\d{1,2})?$/;
        if (amount.length > 0 && !regex.test(amount))
          return "Provide a valid amount";
        if (amount.length > 0 && Number(amount) <= 0)
          return "Amount cannot be zero";
        if (amount.length > 10)
          return "Too much money! Please check the amount";
      },
    },
    { name: "expiryDate", label: "Expiry Date", type: FormFieldType.DATE },
    {
      name: "period",
      label: "Notification Period (In Days)",
      type: FormFieldType.NUMBER,
      validate: (amount: string): string | undefined => {
        const regex = /^\d{1,2}$/;
        if (amount.length > 0 && !regex.test(amount))
          return "Provide a valid amount";
        if (amount.length > 0 && Number(amount) <= 0)
          return "Amount cannot be zero";
        if (amount.length > 10)
          return "Too much money! Please check the amount";
      },
    },
    {
      name: "category",
      label: "Category",
      type: FormFieldType.SELECT,
      isRequired: true,
      options: AppConstants.expenseCategories,
      validate: (category: string): string | undefined => {
        if (!AppConstants.expenseCategory.get(category))
          return "Choose from the list";
      },
    },
    {
      name: "mode",
      label: "Payment Mode",
      type: FormFieldType.SELECT,
      isRequired: true,
      options: AppConstants.paymentOptions,
      validate: (mode: string): string | undefined => {
        if (!AppConstants.paymentMode.get(mode)) return "Choose from the list";
      },
    },
  ];
  return (
    <FormBuilder
      title={`${notification?.id ? "Edit" : "Add"} Notification`}
      defaultValues={initialState}
      values={details}
      fields={formFields}
      onSubmit={onSave}
      isSuccess={context.sideEffects?.modify?.isSuccess}
      onSuccess={context.sideEffects?.modify?.success}
      actionBtnLabel={notification?.id ? "Save" : "Create"}
    />
  );
};

export default EditNotification;
