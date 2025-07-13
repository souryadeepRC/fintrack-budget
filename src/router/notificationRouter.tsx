import { AuthLayout } from "@/components/Layout";
import {
  NotificationDetails,
  NotificationList,
  EditNotification,
} from "@/components/Notification";
import { Notification } from "@/pages";
const notificationRouter = {
  path: "/notification",
  Component: () => (
    <AuthLayout>
      <Notification />
    </AuthLayout>
  ),
  children: [
    {
      index: true,
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
