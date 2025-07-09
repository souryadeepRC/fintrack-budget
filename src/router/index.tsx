import { createBrowserRouter } from "react-router";
import App from "@/App";
import { AutoPay, Debt, Expense, Settings } from "@/pages";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/expense",
        Component: Expense,
        children: [
          {
            path: "/expense/add-expense",
            Component: () => <div>Add New Expense</div>,
          },
          {
            path: "/expense/:expenseId",
            Component: () => <div>Expense Details</div>,
          },
          {
            path: "/expense/:expenseId/edit",
            Component: () => <div>Edit Expense</div>,
          },
        ],
      },
      {
        path: "/debt",
        Component: Debt,
        children: [
          {
            path: "/debt/add-debt",
            Component: () => <div>Add New debt</div>,
          },
          {
            path: "/debt/:debtId",
            Component: () => <div>debt Details</div>,
          },
          {
            path: "/debt/:debtId/edit",
            Component: () => <div>Edit debt</div>,
          },
        ],
      },
      {
        path: "/auto-pay",
        Component: AutoPay,
      },
      {
        path: "/settings",
        Component: Settings,
      },
    ],
  },
  {
    path: "*",
    Component: App,
  },
]);

export default router;
