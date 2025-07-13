export type ExpenseState = {
  id: string; // Unique identifier for expense
  title: string;
  amount: number;
  category: string; // e.g. Food, entertainment
  date: string;
  mode: string; // Payment Mode e.g. creditCard, cash
  note: string;
};
export type MonthlyExpenseReport = {
  currentMonthTotal: number;
  lastMonthTotal: number;
  differencePercent: string;
  trend: "Extra" | "Less" | "Same" | "";
};
