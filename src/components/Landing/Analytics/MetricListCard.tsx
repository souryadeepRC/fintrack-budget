import React from "react";
import classes from "./Analytics.module.scss";
import { formatToINR } from "@/utils";

type MetricItem = {
  name: string;
  value: number;
};

type MetricListCardProps = {
  title: string;
  list: MetricItem[];
};

const MetricListCard: React.FC<MetricListCardProps> = ({ title, list }) => {
  return (
    <div className={classes.metricCard}>
      <h3 className={classes.metricCard__title}>{title}</h3>
      <ul className={classes.metricCard__list}>
        {list.map((item, index) => (
          <li key={index} className={classes.metricCard__item}>
            <span className={classes.metricCard__name}>{item.name}</span>
            <span className={classes.metricCard__value}>
              Rs. {formatToINR(item.value)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MetricListCard;
