import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";

import { AlertDialog, CardDetails } from "@/components/common";

import { convertDate } from "@/utils";
import { EntryContext } from "@/types";
import { ExpenseState } from "@/types/expense";

const ExpenseDetails = () => {
  const context: EntryContext = useOutletContext();
  const expense = context.activeEntry as ExpenseState | undefined;
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const navigate = useNavigate();
  const toggleIsDelete = () => {
    setIsDelete((isDelete) => !isDelete);
  };
  const onBack = () => {
    navigate(-1);
  };
  if (!expense) return <></>;
  return (
    <>
      <AlertDialog
        isOpen={isDelete}
        onClose={toggleIsDelete}
        message="Do you really want to Delete this expense?"
        actions={[
          {
            label: "Yes",
            mode: "alert",
            onClick: () => context.actions?.delete?.(expense.id),
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
            onClick: context.navigation.editEntry,
            startIcon: <FaRegEdit />,
          },
          {
            label: "Remove",
            mode: "alert",
            onClick: toggleIsDelete,
            startIcon: <AiOutlineDelete />,
          },
        ]}
        properties={[
          {
            variant: "heading",
            value: expense.title,
          },
          {
            variant: "chip",
            value: expense.category,
          },
          {
            label: "Amount",
            variant: "amount",
            value: expense.amount,
          },
          {
            label: "Date",
            value: convertDate(expense.date),
          },
          {
            label: "Payment Mode",
            value: expense.mode,
          },
          {
            label: "Note",
            variant: "description",
            value: expense.note,
          },
        ]}
      />
    </>
  );
};

export default ExpenseDetails;
