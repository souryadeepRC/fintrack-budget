import { FaPlusCircle, FaChartPie } from "react-icons/fa";

import { Button } from "@/components/common";
import classes from "./Analytics.module.scss";

interface AnalyticsProps {
  title: string;
  onAdd: () => void;
  children: React.ReactNode;
}
const Analytics: React.FC<AnalyticsProps> = ({ title, onAdd, children }) => {
  return (
    <div className={classes.analytics}>
      <div className={classes.analytics__header}>
        <h2 className={classes.analytics__title}>
          <FaChartPie className={classes.analytics__icon} />
          {title} Overview
        </h2>
        <Button onClick={onAdd} startIcon={<FaPlusCircle />}>
          New {title}
        </Button>
      </div>
      {children}
    </div>
  );
};

export default Analytics;
