import Login from "@/components/Landing/Login/Login";
import { createBrowserRouter, Navigate, Outlet } from "react-router";

const defaultRouter = createBrowserRouter([
  {
    path: "/",
    Component: () => <Outlet />,
    children: [
      {
        index: true,
        Component: () => <Navigate to="/login" />,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "*",
        Component: () => <Navigate to="/login" />,
      },
    ],
  },
]);
export default defaultRouter;
