import classes from "./Analytics.module.scss";

interface MetricCardProps {
  label: string;
  value: string;
  variant?: "default" | "warning" | "alert";
  title?: string;
}
const MetricCard: React.FC<MetricCardProps> = ({
  value,
  label,
  variant = "default",
  title = "",
}) => {
  return (
    <div className={classes.analytics__metricCard} title={title}>
      <strong
        className={`${classes.analytics__metricValue} ${classes[variant]}`}
      >
        {value}
      </strong>
      <span className={classes.analytics__metricLabel}>{label}</span>
    </div>
  );
};
export default MetricCard;
