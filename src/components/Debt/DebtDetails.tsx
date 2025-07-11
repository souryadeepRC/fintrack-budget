import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";

import { AlertDialog, CardDetails } from "@/components/common";

import { convertDate } from "@/utils";
import { EntryContext } from "@/types";
import { DebtCategory, DebtStatus } from "./DebtConfig";

const DebtDetails = () => {
  const context: EntryContext = useOutletContext();
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleIsDelete = () => {
    setIsDelete((isDelete) => !isDelete);
  };
  const onBack = () => {
    navigate(-1);
  };
  const getDebtMessage = () => {
    const isLend = context.activeEntry.category === DebtCategory.LEND;
    const actionVerb: string = isLend ? "collect" : "pay";
    const actionPrep: string = isLend ? "from" : "to";
    const { amount, clearedAmount, name } = context.activeEntry || {};
    return `You need to ${actionVerb} Rs. ${
      amount - clearedAmount
    } ${actionPrep} ${name}`;
  };
  const isPaidDebt: boolean = context.activeEntry.status === DebtStatus.PAID;
  return (
    <>
      <AlertDialog
        isOpen={isDelete}
        onClose={toggleIsDelete}
        message="Do you really want to Delete this debt?"
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
            value: context.activeEntry.status,
          },
          {
            label: "Category",
            value: getDebtMessage(),
          },
          {
            label: "Total Amount",
            value: `Rs. ${context.activeEntry.amount}`,
          },
          ...(!isPaidDebt
            ? [
                {
                  label: "Cleared Amount",
                  value: `Rs. ${context.activeEntry.clearedAmount}`,
                },
                {
                  label: "Pending Amount",
                  value: `Rs. ${
                    context.activeEntry.amount -
                    context.activeEntry.clearedAmount
                  }`,
                },
              ]
            : []),

          {
            label: "Date",
            value: convertDate(context.activeEntry.date),
          },
          {
            label: "Due Date",
            value: convertDate(context.activeEntry.dueDate),
          },
          ...(context.activeEntry.mode
            ? [
                {
                  label: "Payment Mode",
                  value: context.activeEntry.mode,
                },
              ]
            : []),
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

export default DebtDetails;
