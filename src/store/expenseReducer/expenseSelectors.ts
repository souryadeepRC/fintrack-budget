import { RootState } from "@/store";
import { ExpenseState } from "@/types/expense";

export const selectAllExpenses = (store: RootState): ExpenseState[] =>
  store.expense.expenses;
export const selectIsExpenseLoaded = (store: RootState): boolean =>
  store.expense.isLoaded;

export const selectExpense = (
  store: RootState,
  expenseId: string
): ExpenseState | undefined =>
  store.expense.expenses.find((expense) => expense.id === expenseId);
