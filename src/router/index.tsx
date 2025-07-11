import { createBrowserRouter } from "react-router";
import App from "@/App";
import { AutoPay, Debt, Settings } from "@/pages";
import expenseRouter from "./expenseRouter";
import Landing from "@/components/Landing/Landing";
import debtRouter from "./debtRouter";

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
      debtRouter,
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
