import { RootState } from "@/store";
import { NotificationState } from "@/types/notification";

export const selectAllNotifications = (store: RootState): NotificationState[] =>
  store.notification.notifications;
export const selectIsNotificationLoaded = (store: RootState): boolean =>
  store.notification.isLoaded;

export const selectNotification = (
  store: RootState,
  notificationId: string
): NotificationState | undefined =>
  store.notification.notifications.find(
    (notification) => notification.id === notificationId
  );
