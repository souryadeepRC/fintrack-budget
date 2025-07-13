import { createBrowserRouter } from "react-router";
import App from "@/App";
import expenseRouter from "./expenseRouter";
import Landing from "@/components/Landing/Landing";
import debtRouter from "./debtRouter";
import notificationRouter from "./notificationRouter";
import { ReRoute } from "@/components/ErrorPage";
import AuthLayout from "@/components/AuthLayout/AuthLayout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: () => (
          <AuthLayout>
            <Landing />
          </AuthLayout>
        ),
      },
      expenseRouter,
      debtRouter,
      notificationRouter,
      {
        path: "*",
        Component: ReRoute,
      },
    ],
  },
]);

export default router;
