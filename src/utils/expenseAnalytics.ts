import { ExpenseState, MonthlyExpenseReport } from "@/types/expense";

export function getMonthlyExpenseAnalytics(
  expenses: ExpenseState[]
): MonthlyExpenseReport {
  const now = new Date();
  const currentMonth = now.getMonth(); // 0-based
  const currentYear = now.getFullYear();

  const lastMonthDate = new Date(currentYear, currentMonth - 1, 1);
  const lastMonth = lastMonthDate.getMonth();
  const lastMonthYear = lastMonthDate.getFullYear();

  let currentMonthTotal = 0;
  let lastMonthTotal = 0;

  expenses.forEach((expense) => {
    const expenseDate = new Date(expense.date);
    const month = expenseDate.getMonth();
    const year = expenseDate.getFullYear();

    if (month === currentMonth && year === currentYear) {
      currentMonthTotal += expense.amount;
    } else if (month === lastMonth && year === lastMonthYear) {
      lastMonthTotal += expense.amount;
    }
  });

  let differencePercent: number | null = null;
  let trend: MonthlyExpenseReport["trend"] = "";

  if (lastMonthTotal === 0 && currentMonthTotal === 0) {
    trend = "";
    differencePercent = null;
  }
  if (lastMonthTotal === currentMonthTotal) {
    trend = "Same";
    differencePercent = null;
  } else if (lastMonthTotal === 0 && currentMonthTotal > 0) {
    trend = "Extra";
    differencePercent = 100;
  } else {
    const diff = currentMonthTotal - lastMonthTotal;
    differencePercent = Math.abs((diff / lastMonthTotal) * 100);
    trend = diff > 0 ? "Extra" : diff < 0 ? "Less" : "";
  }

  return {
    currentMonthTotal: Number(currentMonthTotal.toFixed(2)),
    lastMonthTotal: Number(lastMonthTotal.toFixed(2)),
    differencePercent:
      differencePercent !== null
        ? `${Number(differencePercent.toFixed(2))}%`
        : "",
    trend,
  };
}
