import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { formatToINR } from "@/utils";
import Analytics from "./Analytics";
import MetricCard from "./MetricCard";
import classes from "./Analytics.module.scss";
import { selectAllExpenses } from "@/store/expenseReducer/expenseSelectors";
import { getMonthlyExpenseAnalytics } from "@/utils/expenseAnalytics";
import { useDownloadCSV } from "@/hooks";
import { Button } from "@/components/common";

const ExpenseAnalytics: React.FC = () => {
  const expenses = useSelector(selectAllExpenses);
  const report = useMemo(() => getMonthlyExpenseAnalytics(expenses), []);
  const downloadCSV = useDownloadCSV("Expense");

  const navigate = useNavigate();
  const onAddExpense = () => {
    navigate("/expense");
  };
  const onDownloadExpense = () => {
    downloadCSV(expenses);
  };

  return (
    <Analytics title="Expense" onAdd={onAddExpense}>
      <div className={classes.analytics__metrics}>
        <MetricCard
          label="This Month"
          value={`Rs. ${formatToINR(report.currentMonthTotal)}`}
        />
        <MetricCard
          label="Last Month"
          value={`Rs. ${formatToINR(report.lastMonthTotal)}`}
        />
        <MetricCard
          label="Compared to Last month"
          value={`${report.differencePercent} ${report.trend}`}
        />
      </div>
      <Button variant="contained" onClick={onDownloadExpense}>
        Download All Expenses
      </Button>
    </Analytics>
  );
};

export default ExpenseAnalytics;
