import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";

import { AlertDialog, CardDetails } from "@/components/common";

import { convertDate, formatToINR } from "@/utils";
import AppConstants from "@/constants";
import { EntryContext } from "@/types";
import { ExpenseState } from "@/types/expense";
import classes from "./Expense.module.scss";

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
  const PaymentModeIcon: any =
    AppConstants.paymentMode.get(expense.mode)?.Icon || FaWallet;

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
            variant: "curve",
            onClick: context.navigation.editEntry,
            startIcon: <FaRegEdit />,
          },
          {
            mode: "alert",
            variant: "curve",
            onClick: toggleIsDelete,
            startIcon: <FaRegTrashAlt />,
          },
        ]}
      >
        <div className={classes.expense}>
          <h5 className={classes.expense__heading}>{expense.title}</h5>
          <p className={classes.expense__category}>{expense.category}</p>
          <div className={classes.expense__details}>
            <strong className={classes.expense__amount}>
              Rs.&nbsp;{formatToINR(Number(expense.amount))}
            </strong>
            <p className={classes.expense__date}>{convertDate(expense.date)}</p>
          </div>
          <p className={classes.expense__mode}>
            Paid by <PaymentModeIcon />
            &nbsp;
            {expense.mode}
          </p>
          <em className={classes.expense__note}>{expense.note}</em>
        </div>
      </CardDetails>
    </>
  );
};

export default ExpenseDetails;
