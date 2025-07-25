import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

import { AlertDialog, CardDetails } from "@/components/common";

import { convertDate, formatToINR } from "@/utils";
import { EntryContext } from "@/types";
import { NotificationState } from "@/types/notification";
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
  const getExpiryMessage = (): string | null => {
    const now = new Date();
    const expiryDate = new Date(notification.expiryDate);
    const diffMs = expiryDate.getTime() - now.getTime();

    if (diffMs <= 0) {
      return "Already expired";
    }

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
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
          <em className={classes.notification__note}>{notification.note}</em>
          <div className={classes.notification__details}>
            <div className={classes.notification__period}>
              <p>Expire on</p>
              <strong className={classes.notification__period__date}>
                {convertDate(notification.expiryDate)}
              </strong>
            </div>
            <div className={classes.notification__period}>
              <p>Registered on</p>
              <strong className={classes.notification__period__date}>
                {convertDate(notification.registerDate)}
              </strong>
            </div>
          </div>
          <p>
            Amount:&nbsp;
            <strong>Rs.&nbsp;{formatToINR(Number(notification.amount))}</strong>
          </p>
        </div>
      </CardDetails>
    </>
  );
};

export default NotificationDetails;
