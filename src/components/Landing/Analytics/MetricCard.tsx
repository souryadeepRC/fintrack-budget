import classes from "./Analytics.module.scss";

interface MetricCardProps {
  label: string;
  value: string;
  variant?: "default" | "warning" | "alert";
}
const MetricCard: React.FC<MetricCardProps> = ({
  value,
  label,
  variant = "default",
}) => {
  return (
    <div className={classes.analytics__metricCard}>
      <strong className={`${classes.analytics__metricValue} ${classes[variant]}`}>
        {value}
      </strong>
      <span className={classes.analytics__metricLabel}>{label}</span>
    </div>
  );
};
export default MetricCard;
