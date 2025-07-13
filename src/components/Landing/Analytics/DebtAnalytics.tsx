import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { formatToINR } from "@/utils";
import Analytics from "./Analytics";
import MetricCard from "./MetricCard";
import { getDebtAnalytics } from "@/utils/debtAnalytics";
import { selectAllDebts } from "@/store/debtReducer/debtSelectors";
import classes from "./Analytics.module.scss";
import MetricListCard from "./MetricListCard";

const DebtAnalytics: React.FC = () => {
  const debts = useSelector(selectAllDebts);
  const report = useMemo(() => getDebtAnalytics(debts), []);

  const navigate = useNavigate();
  const onAddDebt = () => {
    navigate("/debt");
  };
  return (
    <Analytics title="Debt" onAdd={onAddDebt}>
      <div className={classes.analytics__metrics}>
        <MetricCard
          label="Need to Collect"
          value={`Rs. ${formatToINR(report.totalActiveLend)}`}
        />
        <MetricCard
          label="Need to Pay"
          value={`Rs. ${formatToINR(report.totalActiveBorrow)}`}
        />
      </div>
      <MetricListCard title="Top 5 Lenders" list={report.topLenders} />
      <MetricListCard title="Top 5 Borrowers" list={report.topBorrowers} />
    </Analytics>
  );
};

export default DebtAnalytics;
