import { createBrowserRouter } from "react-router";
import App from "@/App";
import { Settings } from "@/pages";
import expenseRouter from "./expenseRouter";
import Landing from "@/components/Landing/Landing";
import debtRouter from "./debtRouter";
import notificationRouter from "./notificationRouter";

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
      notificationRouter,
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
