import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";

import { AlertDialog, CardDetails } from "@/components/common";

import { convertDate } from "@/utils";
import { EntryContext } from "@/types";
import { NotificationState } from "@/types/notification";

const NotificationDetails = () => {
  const context: EntryContext = useOutletContext();
  const notification = context.activeEntry as NotificationState | undefined;
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleIsDelete = () => {
    setIsDelete((isDelete) => !isDelete);
  };
  const onBack = () => {
    navigate(-1);
  };

  if (!notification) return <></>;
  return (
    <>
      <AlertDialog
        isOpen={isDelete}
        onClose={toggleIsDelete}
        message="Do you really want to Delete this notification?"
        actions={[
          {
            label: "Yes",
            mode: "error",
            onClick: () => context.actions?.delete?.(notification.id),
          },
          {
            label: "Cancel",
            variant: "text",
            onClick: toggleIsDelete,
          },
        ]}
      />
      <CardDetails
        isEmpty={!notification}
        type={context.type}
        backAction={{ label: "Back", onClick: onBack }}
        actions={[
          {
            label: "Edit",
            variant: "outlined",
            onClick: context.navigation.editEntry,
            startIcon: <FaRegEdit />,
          },

          {
            label: "Remove",
            mode: "error",
            onClick: toggleIsDelete,
            startIcon: <AiOutlineDelete />,
          },
        ]}
        properties={[
          {
            variant: "heading",
            value: notification.title,
          },
          {
            label: "Note",
            variant: "description",
            value: notification.note,
          },
          ...(notification.amount === 0
            ? [
                {
                  label: "Total Amount",
                  variant: "amount" as any,
                  value: notification.amount,
                },
              ]
            : []),
          {
            label: "Total Amount",
            value: `Rs. ${notification.registerDate}`,
          },
          ...(notification.lastAlertDate
            ? [
                {
                  label: "Total Amount",
                  value: `Rs. ${notification.lastAlertDate}`,
                },
              ]
            : []),
          ...(notification.expiryDate
            ? [
                {
                  label: "Expiry Date",
                  value: convertDate(notification.expiryDate),
                },
              ]
            : []),
          ...(notification.documentLocation
            ? [
                {
                  label: "Document Location",
                  variant: "description" as any,
                  value: notification.documentLocation,
                },
              ]
            : []),
        ]}
      />
    </>
  );
};

export default NotificationDetails;
