import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { formatToINR } from "@/utils";
import Analytics from "./Analytics";
import MetricCard from "./MetricCard";
import classes from "./Analytics.module.scss";
import { selectAllExpenses } from "@/store/expenseReducer/expenseSelectors";
import { useDownloadCSV } from "@/hooks";
import expenseService from "@/service/Expense";
import { Button } from "@/components/common";
import { FormSelect } from "@/components/common/FormBuilder/FormField";

const MONTH_OPTIONS = [
  { value: 0, label: "Jan" },
  { value: 1, label: "Feb" },
  { value: 2, label: "Mar" },
  { value: 3, label: "Apr" },
  { value: 4, label: "May" },
  { value: 5, label: "Jun" },
  { value: 6, label: "Jul" },
  { value: 7, label: "Aug" },
  { value: 8, label: "Sep" },
  { value: 9, label: "Oct" },
  { value: 10, label: "Nov" },
  { value: 11, label: "Dec" },
];
const ExpenseAnalytics: React.FC = () => {
  const expenses = useSelector(selectAllExpenses);

  const now = new Date();

  const [dateFilter, setDateFilter] = useState({
    month: now.getUTCMonth() > 0 ? now.getUTCMonth() - 1 : now.getUTCMonth(),
    year: now.getUTCFullYear(),
  });
  const handleChange = (name: string, value: number) => {
    setDateFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const downloadCSV = useDownloadCSV("Expense");

  const navigate = useNavigate();
  const onAddExpense = () => {
    navigate("/expense");
  };
  const onDownloadExpense = () => {
    const expenseDate = new Date(
      Date.UTC(dateFilter.year, dateFilter.month, 1)
    );
    const monthName = expenseDate.toLocaleString("default", { month: "long" });

    expenseService
      .getAllExpenses(expenseDate)
      .then((expense) => {
        downloadCSV(expense, `${monthName}_${dateFilter.year}`);
      })
      .catch((err) => console.error(err));
  };

  const totalExpense = expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );
  return (
    <Analytics title="Expense" onAdd={onAddExpense}>
      <div className={classes.analytics__metrics}>
        <MetricCard
          label="This Month"
          value={`Rs. ${formatToINR(totalExpense)}`}
        />
      </div>
      <div className={classes.analytics__download}>
        <FormSelect
          commonProps={{
            value: dateFilter.month,
            name: "month",
            className: classes.analytics__download_filter,
            onChange: (e: any) => handleChange("month", Number(e.target.value)),
          }}
          options={MONTH_OPTIONS}
        />

        <FormSelect
          commonProps={{
            value: dateFilter.year,
            name: "year",
            className: classes.analytics__download_filter,
            onChange: (e: any) => handleChange("year", Number(e.target.value)),
          }}
          options={[{ value: 2025, label: "2025" }]}
        />
        <Button variant="contained" onClick={onDownloadExpense}>
          Download All Expenses
        </Button>
      </div>
    </Analytics>
  );
};

export default ExpenseAnalytics;
