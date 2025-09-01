import { Notification } from "@/pages";
import { lazy } from "react";
import { Navigate } from "react-router";

const EditNotification = lazy(
  () => import("@/components/Notification/EditNotification")
);
const UpcomingNotification = lazy(
  () => import("@/components/Notification/UpcomingNotification")
);
const NotificationDetails = lazy(
  () => import("@/components/Notification/NotificationDetails")
);
const NotificationList = lazy(
  () => import("@/components/Notification/NotificationList")
);
const notificationRouter = {
  path: "/notification",
  Component: Notification,
  children: [
    {
      index: true,
      Component: () => <Navigate to="/notification/upcoming" />,
    },
    {
      path: "/notification/upcoming",
      Component: UpcomingNotification,
    },
    {
      path: "/notification/all",
      Component: NotificationList,
    },
    {
      path: "/notification/filter",
      Component: () => <>Filter</>,
    },
    {
      path: "/notification/add-notification",
      Component: EditNotification,
    },
    {
      path: "/notification/:notificationId",
      Component: NotificationDetails,
    },
    {
      path: "/notification/:notificationId/edit",
      Component: EditNotification,
    },
  ],
};

export default notificationRouter;
