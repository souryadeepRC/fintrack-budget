import { useState, FC } from "react";
import { useOutletContext } from "react-router";

import { Button, DashboardView } from "@/components/common";
import { EntryContext } from "@/types";
import { convertDate, calculateDurationInDays } from "@/utils";
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
      const expiryDate = new Date(
        (notification as NotificationState).expiryDate
      );
      return expiryDate <= limitDate;
    })
    .sort((a, b) => {
      return (
        new Date((a as NotificationState).expiryDate).getTime() -
        new Date((b as NotificationState).expiryDate).getTime()
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
            const expiryDate = new Date(notification.expiryDate);
            const duration = calculateDurationInDays(now, expiryDate);

            return (
              <div
                key={notification.id}
                className={classes.upcoming__notification}
                onClick={() => context.navigation.showEntry(notification.id)}
              >
                <div>
                  <h2>{notification.title}</h2>
                  <p className={classes.card__date}>
                    Due date: {convertDate(notification.expiryDate)}
                  </p>
                </div>
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
