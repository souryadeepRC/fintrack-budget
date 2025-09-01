import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";

import { AlertDialog, Button, CardDetails } from "@/components/common";

import {
  convertDate,
  formatIsoToDate,
  formatToINR,
  calculateDurationInDays,
} from "@/utils";
import { EntryContext } from "@/types";
import { NotificationState } from "@/types/notification";
import AppConstants from "@/constants";
import classes from "./Notification.module.scss";

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

  const payAutoPayment = () => {
    context.actions?.payAutoPayment?.({
      id: "",
      title: notification.title,
      amount: notification.amount || 0,
      category: notification.category,
      date: formatIsoToDate(new Date(Date.now()).toISOString()),
      mode: notification.mode,
      note: notification.note,
    });
  };
  const getExpiryMessage = (): string | null => {
    const now = new Date();
    const expiryDate = new Date(notification.expiryDate);
    const diffDays = calculateDurationInDays(now, expiryDate);

    if (diffDays <= 0) {
      return "Already expired";
    }

    const diffMonths = Math.floor(diffDays / 30);

    if (diffMonths > 6) {
      return null;
    }

    if (diffMonths >= 1) {
      return `Going to expire in ${diffMonths} month${
        diffMonths > 1 ? "s" : ""
      }`;
    }

    return `Going to expire in ${diffDays} day${diffDays > 1 ? "s" : ""}`;
  };

  const PaymentModeIcon: any =
    AppConstants.paymentMode.get(notification.mode)?.Icon || FaWallet;
  return (
    <>
      <AlertDialog
        isOpen={isDelete}
        onClose={toggleIsDelete}
        message="Do you really want to Delete this notification?"
        actions={[
          {
            label: "Yes",
            mode: "alert",
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
        <div className={classes.notification}>
          <h5 className={classes.notification__heading}>
            {notification.title}
          </h5>
          <p className={classes.notification__message}>{getExpiryMessage()}</p>
          <p className={classes.notification__category}>
            {notification.category}
          </p>
          <p className={classes.notification__mode}>
            Need to Pay&nbsp;
            <strong>Rs.&nbsp;{formatToINR(Number(notification.amount))}</strong>
            &nbsp;using <PaymentModeIcon />
            &nbsp;
            {notification.mode}
          </p>
          <div className={classes.notification__period}>
            <p>Next Payment Date</p>
            <strong className={classes.notification__period__date}>
              {convertDate(notification.expiryDate)}
            </strong>
          </div>
          <em className={classes.notification__note}>{notification.note}</em>
          <Button onClick={payAutoPayment}>
            Pay Rs.&nbsp;{formatToINR(Number(notification.amount))}
          </Button>
        </div>
      </CardDetails>
    </>
  );
};

export default NotificationDetails;
