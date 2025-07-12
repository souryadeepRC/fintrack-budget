import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";

import { AlertDialog, CardDetails } from "@/components/common";

import { convertDate } from "@/utils";
import { EntryContext } from "@/types";

const NotificationDetails = () => {
  const context: EntryContext = useOutletContext();
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleIsDelete = () => {
    setIsDelete((isDelete) => !isDelete);
  };
  const onBack = () => {
    navigate(-1);
  };

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
            onClick: context.onDeleteEntry,
          },
          {
            label: "Cancel",
            variant: "text",
            onClick: toggleIsDelete,
          },
        ]}
      />
      <CardDetails
        isEmpty={!context.activeEntry}
        type={context.type}
        backAction={{ label: "Back", onClick: onBack }}
        actions={[
          {
            label: "Edit",
            variant: "outlined",
            onClick: context.onEditEntry,
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
            value: context.activeEntry.title,
          },
          {
            label: "Note",
            variant: "description",
            value: context.activeEntry.note,
          },
          context.activeEntry.amount && {
            label: "Total Amount",
            value: `Rs. ${context.activeEntry.amount}`,
          },
          {
            label: "Date",
            value: convertDate(context.activeEntry.registerDate),
          },
          context.activeEntry.lastAlertDate && {
            label: "Last Alert Date",
            value: convertDate(context.activeEntry.lastAlertDate),
          },
          context.activeEntry.expiryDate && {
            label: "Expiry Date",
            value: convertDate(context.activeEntry.expiryDate),
          },
          context.activeEntry.documentLocation && {
            label: "Document Location",
            variant: "description",
            value: context.activeEntry.documentLocation,
          },
        ]}
      />
    </>
  );
};

export default NotificationDetails;
