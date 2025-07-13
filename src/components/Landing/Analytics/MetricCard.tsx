import classes from "./Analytics.module.scss";

interface MetricCardProps {
  label: string;
  value: string;
}
const MetricCard: React.FC<MetricCardProps> = ({ value, label }) => {
  return (
    <div className={classes.analytics__metricCard}>
      <strong className={classes.analytics__metricValue}>{value}</strong>
      <span className={classes.analytics__metricLabel}>{label}</span>
    </div>
  );
};
export default MetricCard;
