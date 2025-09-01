import { useState, FC } from "react";
import { useOutletContext } from "react-router";

import { Button, DashboardView } from "@/components/common";
import { EntryContext } from "@/types";
import { convertDate, formatToINR } from "@/utils";
import classes from "./Notification.module.scss";
import { NotificationState } from "@/types/notification";

interface DurationBtnProps {
  isSelected: boolean;
  label: number;
  onClick: () => void;
}

const DurationBtn: FC<DurationBtnProps> = ({ isSelected, onClick, label }) => (
  <Button
    className={isSelected ? classes.selected : ""}
    variant="text"
    onClick={onClick}
  >
    {label}
  </Button>
);

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const calculateDurationInDays = (from: Date, to: Date): number =>
  Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));

const getDurationLabel = (daysLeft: number): React.ReactNode => {
  if (daysLeft > 0) {
    return (
      <p className={classes.payment_period}>
        {daysLeft} Day{daysLeft > 1 ? "s" : ""} Left
      </p>
    );
  }
  if (daysLeft === 0) {
    return <p className={classes.payment_period}>Today</p>;
  }
  return (
    <p className={`${classes.payment_period} ${classes.expired}`}>Expired</p>
  );
};

const UpcomingNotification: FC = () => {
  const context: EntryContext = useOutletContext();
  const [durationLimit, setDurationLimit] = useState<number>(5);

  const now = new Date();
  const limitDate = addDays(now, durationLimit);

  const upcomingNotifications = context.entries
    .filter((notification) => {
      const lastAlertDate = new Date(
        (notification as NotificationState).lastAlertDate
      );
      return lastAlertDate <= limitDate;
    })
    .sort((a, b) => {
      return (
        new Date((a as NotificationState).lastAlertDate).getTime() -
        new Date((b as NotificationState).lastAlertDate).getTime()
      );
    }) as NotificationState[];
  return (
    <DashboardView
      isLoading={!context.isEntryLoaded}
      type={context.type}
      headerActions={[
        {
          label: `Show All ${context.type}s`,
          onClick: context.navigation.showAll as () => void,
        },
      ]}
    >
      <div className={classes.upcoming__notifications}>
        <h2 className={classes.notification__duration}>
          Upcoming Payments within
          <section>
            {[5, 10, 15].map((days) => (
              <DurationBtn
                key={days}
                label={days}
                isSelected={durationLimit === days}
                onClick={() => setDurationLimit(days)}
              />
            ))}
            <span>Days</span>
          </section>
        </h2>

        <section>
          {upcomingNotifications.map((notification) => {
            const lastAlertDate = new Date(notification.lastAlertDate);
            const duration = calculateDurationInDays(now, lastAlertDate);

            return (
              <div
                key={notification.id}
                className={classes.upcoming__notification}
              >
                <div>
                  <h2>{notification.title}</h2>
                  <p className={classes.card__date}>
                    Due date: {convertDate(notification.lastAlertDate)}
                  </p>
                </div>
                <Button {...(duration < 0 && { mode: "alert" })}>
                  Pay Rs.&nbsp;{formatToINR(Number(notification.amount))}
                </Button>
                {getDurationLabel(duration)}
              </div>
            );
          })}
        </section>
      </div>
    </DashboardView>
  );
};

export default UpcomingNotification;
