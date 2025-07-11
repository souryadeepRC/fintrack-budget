import { RootState } from "@/store";
import { selectNotification } from "@/store/notificationReducer/notificationSelectors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useMutation } from "@tanstack/react-query";

import notificationDBService from "@/service/Notification";
import { NotificationState } from "@/types/notification";
import { toast } from "sonner";
import { editNotification } from "@/store/notificationReducer/notificationReducer";
import { formatIsoToDate } from "@/utils";
import FormBuilder from "@/components/common/FormBuilder/FormBuilder";
import {
  FieldConfig,
  FormFieldType,
} from "@/components/common/FormBuilder/FormConfig";

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
  const dispatch = useDispatch();
  const { notificationId } = useParams<{ notificationId: string }>();
  const notification = useSelector((state: RootState) =>
    notificationId ? selectNotification(state, notificationId) : undefined
  );
  const { mutate } = useMutation({
    mutationFn: (notification: NotificationState) =>
      notificationDBService.storeNotification(notification),
    onSuccess: function (response: NotificationState) {
      dispatch(editNotification(response));
      toast.success(`Notification added for: ${response.title}`);
      setTimeout(() => navigate("/notification"), 0);
    },
    onError: function () {
      toast.error(`Failed to add notification`);
    },
  });

  const [details, setDetails] =
    useState<NotificationDetailsState>(initialState);

  const navigate = useNavigate();

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
    mutate({
      id: notificationId,
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
      name: "note",
      label: "Note",
      isRequired: true,
      type: FormFieldType.TEXTAREA,
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
      name: "registerDate",
      label: "Register Date",
      type: FormFieldType.DATE,
      isRequired: true,
    },
    {
      name: "lastAlertDate",
      label: "Last Alert Date",
      type: FormFieldType.DATE,
    },
    { name: "expiryDate", label: "Expiry Date", type: FormFieldType.DATE },
    {
      name: "documentLocation",
      label: "Document Location",
      type: FormFieldType.TEXTAREA,
    },
  ];
  return (
    <FormBuilder
      title={`${notificationId ? "Edit" : "Add"} Notification`}
      defaultValues={initialState}
      values={details}
      fields={formFields}
      onSubmit={onSave}
      actionBtnLabel={notificationId ? "Save" : "Create"}
    />
  );
};

export default EditNotification;
