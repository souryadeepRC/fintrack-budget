import { RootState } from "@/store";
import { ExpenseState } from "@/types/expense";

export const selectAllExpenses = (store: RootState): ExpenseState[] =>
  store.expense.expenses;

export const selectExpense = (
  store: RootState,
  expenseId: string
): ExpenseState | undefined =>
  store.expense.expenses.find((expense) => expense.id === expenseId);
