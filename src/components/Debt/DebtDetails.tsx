import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { FaRegEdit, FaWallet } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";

import { AlertDialog, CardDetails } from "@/components/common";

import { convertDate, formatToINR } from "@/utils";
import { ActionButtonType, EntryContext } from "@/types";
import AppConstants from "@/constants";
import { DebtCategory, DebtStatus } from "./DebtConfig";
import { DebtState } from "@/types/debt";

import classes from "./Debt.module.scss";

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

  const PaymentModeIcon: any =
    AppConstants.paymentMode.get(debt.mode)?.Icon || FaWallet;

  const isPaidDebt: boolean = debt.status === DebtStatus.PAID;
  const isLendDebt: boolean = debt.category === DebtCategory.LEND;

  const getDebtMessage = () => {
    const actionVerb: string = isLendDebt ? "Collect" : "Pay";
    const actionPrep: string = isLendDebt ? "from" : "to";
    return (
      <p className={classes.debt__message}>
        <strong>{actionVerb}</strong> {actionPrep}
        <strong>{debt.name}</strong>
      </p>
    );
  };
  const getClearedMessage = () => {
    const actionVerb: string = isLendDebt ? "Collected" : "Paid";
    const actionPrep: string = isLendDebt ? "from" : "to";
    return (
      <div className={classes.debt__paid__msg}>
        <p>
          <strong>{actionVerb}</strong>&nbsp;{actionPrep}&nbsp;
          <strong>{debt.name}</strong>
        </p>
        <p>
          on&nbsp;<strong>{convertDate(debt.clearanceDate || "")}</strong>
        </p>
      </div>
    );
  };
  const getDebtAmount = () => {
    const { amount, clearedAmount } = debt || {};

    if (isPaidDebt || !Boolean(clearedAmount)) {
      return <strong>Rs.&nbsp;{formatToINR(Number(amount))}</strong>;
    }
    const pendingAmount = amount - clearedAmount;
    return (
      <p className={classes.debt__amount__partial_paid}>
        <strong>Rs.&nbsp;{formatToINR(Number(pendingAmount))}</strong>
        <del>Rs.&nbsp;{formatToINR(Number(amount))}</del>
      </p>
    );
  };
  const getDebtStatus = () => {
    const status = AppConstants.debtStatus.get(debt.status);
    if (!status) return <p className={classes.debt__status}>Others</p>;

    return (
      <p
        className={`${classes.debt__status} ${
          !isPaidDebt ? classes.debt__unpaid : ""
        }`}
      >
        {<status.Icon />}
        {status.value}
      </p>
    );
  };
  const deleteAction: ActionButtonType = {
    variant: "curve",
    mode: "alert",
    onClick: toggleIsDelete,
    startIcon: <AiOutlineDelete />,
  };
  const editAction: ActionButtonType = {
    variant: "curve",
    onClick: context.navigation.editEntry,
    startIcon: <FaRegEdit />,
  };
  return (
    <>
      <AlertDialog
        isOpen={isDelete}
        onClose={toggleIsDelete}
        message="Do you really want to Delete this debt?"
        actions={[
          {
            label: "Yes",
            mode: "alert",
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
        actions={
          debt.status === DebtStatus.PAID
            ? [deleteAction]
            : [editAction, deleteAction]
        }
      >
        <div className={classes.debt}>
          <h5 className={classes.debt__heading}>{debt.title}</h5>
          {getDebtStatus()}
          <div className={classes.debt__details}>
            <div className={classes.debt__amount}>{getDebtAmount()}</div>
            <p className={classes.debt__date}>{convertDate(debt.date)}</p>
          </div>

          {isPaidDebt ? getClearedMessage() : getDebtMessage()}

          <p className={classes.debt__mode}>
            {isLendDebt ? "Paid" : "Collected"} by <PaymentModeIcon />
            &nbsp;
            {debt.mode}
          </p>
          <em className={classes.debt__note}>{debt.note}</em>
        </div>
      </CardDetails>
    </>
  );
};

export default DebtDetails;
