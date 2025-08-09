import { Expense } from "@/pages";
import { Navigate } from "react-router";
import { lazy } from "react";

const EditExpense = lazy(() => import("@/components/expense/EditExpense"));
const ExpenseDetails = lazy(
  () => import("@/components/expense/ExpenseDetails")
);
const ExpenseList = lazy(() => import("@/components/expense/ExpenseList"));

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
        return <Navigate to="/expense" />;
      },
    },
  ],
};

export default expenseRouter;
