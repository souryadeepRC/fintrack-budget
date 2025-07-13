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

type NotificationDetailsState = {
  title: string;
  note: string;
  amount?: string;
  registerDate: string;
  lastAlertDate: string;
  expiryDate: string;
  documentLocation: string;
};
const initialState = {
  title: "",
  note: "",
  amount: "",
  registerDate: "",
  lastAlertDate: "",
  expiryDate: "",
  documentLocation: "",
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
      amount: `${notification.amount}`,
      registerDate: formatIsoToDate(notification.registerDate),
      lastAlertDate: formatIsoToDate(notification.lastAlertDate),
      expiryDate: formatIsoToDate(notification.expiryDate),
    });
  }, [notification]);

  const onSave = (response: any) => {
    context.actions?.modify?.({
      id: notification?.id || "",
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
      name: "note",
      label: "Note",
      isRequired: true,
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
        if (amount.length > 10)
          return "Too much money! Please check the amount";
      },
    },
    {
      name: "registerDate",
      label: "Register Date",
      type: FormFieldType.DATE,
      isRequired: true,
    },
    { name: "expiryDate", label: "Expiry Date", type: FormFieldType.DATE },
    {
      name: "lastAlertDate",
      label: "Last Alert Date",
      type: FormFieldType.DATE,
    },
    {
      name: "documentLocation",
      label: "Document Location",
      type: FormFieldType.TEXTAREA,
      validate: (location: string): string | undefined => {
        if (location.length > 150)
          return "Location can not be more than 150 letters";
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
