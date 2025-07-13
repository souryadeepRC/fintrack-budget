import { EditExpense, ExpenseDetails, ExpenseList } from "@/components/expense";
import { Expense } from "@/pages";
import { Navigate } from "react-router";

const expenseRouter = {
  path: "/expense",
  Component: Expense,
  children: [
    {
      index: true,
      Component: () => <Navigate to="/expense/all" />,
    },
    {
      path: "/expense/all",
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
    {
      path: "*",
      Component: () => {
        console.log("re route");
        return <Navigate to="/expense" />;
      },
    },
  ],
};

export default expenseRouter;
