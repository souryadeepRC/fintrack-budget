import {
  NotificationDetails,
  NotificationList,
  EditNotification,
} from "@/components/Notification";
import { Notification } from "@/pages";
import { Navigate } from "react-router";
const notificationRouter = {
  path: "/notification",
  Component: Notification,
  children: [
    {
      index: true,
      Component: () => <Navigate to="/notification/all" />,
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
