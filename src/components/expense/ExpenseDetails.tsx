import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";

import { AlertDialog, CardDetails } from "@/components/common";

import { convertDate } from "@/utils";
import { EntryContext } from "@/types";

const ExpenseDetails = () => {
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
        message="Do you really want to Delete this expense?"
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
            variant: "chip",
            value: context.activeEntry.category,
          },
          {
            label: "Amount",
            value: `Rs. ${context.activeEntry.amount}`,
          },
          {
            label: "Date",
            value: convertDate(context.activeEntry.date),
          },
          {
            label: "Payment Mode",
            value: context.activeEntry.mode,
          },
          {
            label: "Note",
            variant: "description",
            value: context.activeEntry.note,
          },
        ]}
      />
    </>
  );
};

export default ExpenseDetails;
