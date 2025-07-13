import AuthLayout from "@/components/AuthLayout/AuthLayout";
import { EditExpense, ExpenseDetails, ExpenseList } from "@/components/expense";
import { Expense } from "@/pages";
const expenseRouter = {
  path: "/expense",
  Component: () => (
    <AuthLayout>
      <Expense />
    </AuthLayout>
  ),
  children: [
    {
      index: true,
      Component: ExpenseList,
    },
    {
      path: "/expense/filter",
      Component: () => <>Filter</>,
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
