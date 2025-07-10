import { createBrowserRouter } from "react-router";
import App from "@/App";
import { AutoPay, Debt, Settings } from "@/pages";
import expenseRouter from "./expenseRouter";
import Landing from "@/components/Landing/Landing";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Landing,
      },
      expenseRouter,
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
