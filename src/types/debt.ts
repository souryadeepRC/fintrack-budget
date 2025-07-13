export type DebtCategoryType = "Lend" | "Borrow";
export type DebtStatusType = "Unpaid" | "Paid";

export type DebtState = {
  id: string; // Unique identifier for expense
  title: string;
  amount: number;
  category: DebtCategoryState; // e.g. Lend / Borrow
  date: string;
  mode: string; // Payment Mode e.g. creditCard, cash
  name: string;
  dueDate?: string;
  status: DebtStatusType;
  note: string;
  clearedAmount: number;
};
export type DebtCategoryState = "Lend" | "Borrow";
export type DebtAnalyticsReport = {
  totalActiveLend: number;
  totalActiveBorrow: number;
  topLenders: { name: string; value: number }[];
  topBorrowers: { name: string; value: number }[];
};
