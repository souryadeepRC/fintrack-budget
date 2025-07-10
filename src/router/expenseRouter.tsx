import {
  EditExpense,
  ExpenseDetails,
  ExpenseFilter,
  ExpenseList,
} from "@/components/expense";
import { Expense } from "@/pages";
const expenseRouter = {
  path: "/expense",
  Component: Expense,
  children: [
    {
      index: true,
      Component: ExpenseList,
    },
    {
      path: "/expense/filter",
      Component: ExpenseFilter,
    },
    {
      path: "/expense/add-expense",
      Component: EditExpense,
    },
    {
      path: "/expense/:expenseId",
      Component: ExpenseDetails,
    },
    {
      path: "/expense/:expenseId/edit",
      Component: EditExpense,
    },
  ],
};

export default expenseRouter;
