import { RootState } from "@/store";
import {
  selectAllNotifications,
  selectNotification,
  selectIsNotificationLoaded,
} from "@/store/notificationReducer/notificationSelectors";
import notificationService from "@/service/Notification";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import {
  addNotification,
  editNotification,
  removeNotification,
} from "@/store/notificationReducer/notificationReducer";
import { NotificationState } from "@/types/notification";
import { EntryContext } from "@/types";

const Notification: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { notificationId } = useParams<{ notificationId: string }>();

  const notifications: NotificationState[] = useSelector(
    selectAllNotifications
  );
  const isNotificationsLoaded: boolean = useSelector(
    selectIsNotificationLoaded
  );

  const activeNotification = useSelector((state: RootState) =>
    notificationId ? selectNotification(state, notificationId) : undefined
  );

  const modifyMutation = useMutation({
    mutationFn: (notification: NotificationState) =>
      notificationService.storeNotification(notification),
    onSuccess: function (response: NotificationState) {
      notificationId
        ? dispatch(editNotification(response))
        : dispatch(addNotification(response));
      toast.success(
        notificationId
          ? "Notification saved successfully"
          : `Notification added for: ${response.title}`
      );
    },
    onError: function () {
      toast.error(`Failed to ${notificationId ? "save" : "add"} notification`);
    },
  });

  const { mutate: deleteNotification } = useMutation({
    mutationFn: (id: string) => notificationService.deleteNotification(id),
    onSuccess: function () {
      notificationId && dispatch(removeNotification(notificationId));
      toast.success(`Notification removed successfully`);
      setTimeout(() => navigate("/notification"), 0);
    },
    onError: function () {
      toast.error(`Failed to remove notification`);
    },
  });

  const notificationContext: EntryContext = {
    type: "Notification",
    navigation: {
      addEntry: () => navigate(`/notification/add-notification`),
      editEntry: () => navigate(`/notification/${notificationId}/edit`),
      showAll: (notificationId: string) =>
        navigate(`/notification/${notificationId}`),
    },
    isEntryLoaded: isNotificationsLoaded,
    entries: notifications,
    activeEntry: activeNotification,
    actions: {
      modify: (notification: any) => modifyMutation.mutate(notification),
      delete: (notificationId: string) => deleteNotification(notificationId),
    },
    sideEffects: {
      modify: {
        isSuccess: modifyMutation.isSuccess,
        success: () =>
          setTimeout(() => {
            navigate("/notification");
            modifyMutation.reset();
          }, 0),
      },
    },
  };
  return <Outlet context={notificationContext} />;
};

export default Notification;
