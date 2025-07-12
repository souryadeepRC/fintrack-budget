import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";

import { AlertDialog, CardDetails } from "@/components/common";

import { convertDate } from "@/utils";
import { EntryContext } from "@/types";
import { DebtCategory, DebtStatus } from "./DebtConfig";
import { DebtState } from "@/types/debt";

const DebtDetails = () => {
  const context: EntryContext = useOutletContext();
  const debt = context.activeEntry as DebtState | undefined;
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleIsDelete = () => {
    setIsDelete((isDelete) => !isDelete);
  };
  const onBack = () => {
    navigate(-1);
  };
  if (!debt) return <></>;
  const getDebtMessage = () => {
    const isLend = debt.category === DebtCategory.LEND;
    const actionVerb: string = isLend ? "collect" : "pay";
    const actionPrep: string = isLend ? "from" : "to";
    const { amount, clearedAmount, name } = debt || {};
    return `You need to ${actionVerb} Rs. ${
      amount - clearedAmount
    } ${actionPrep} ${name}`;
  };
  const isPaidDebt: boolean = debt.status === DebtStatus.PAID;
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
            onClick: () => context.actions?.delete?.(debt.id),
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
            mode: "error",
            onClick: toggleIsDelete,
            startIcon: <AiOutlineDelete />,
          },
        ]}
        properties={[
          {
            variant: "heading",
            value: debt.title,
          },
          {
            variant: "chip",
            value: debt.status,
          },
          {
            label: "Category",
            value: getDebtMessage(),
          },
          {
            label: "Total Amount",
            variant: "amount",
            value: debt.amount,
          },
          ...(!isPaidDebt
            ? [
                {
                  label: "Cleared Amount",
                  value: debt.clearedAmount,
                  variant: "amount" as any,
                },
                {
                  label: "Pending Amount",
                  variant: "amount" as any,
                  value: debt.amount - debt.clearedAmount,
                },
              ]
            : []),

          {
            label: "Date",
            value: convertDate(debt.date),
          },
          {
            label: "Due Date",
            value: convertDate(debt.dueDate || ""),
          },
          ...(debt.mode
            ? [
                {
                  label: "Payment Mode",
                  value: debt.mode,
                },
              ]
            : []),
          {
            label: "Note",
            variant: "description",
            value: debt.note,
          },
        ]}
      />
    </>
  );
};

export default DebtDetails;
