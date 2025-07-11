import { RootState } from "@/store";
import {
  selectAllNotifications,
  selectNotification,
  selectIsNotificationLoaded,
} from "@/store/notificationReducer/notificationSelectors";
import notificationService from "@/service/Notification";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import {
  loadNotifications,
  removeNotification,
} from "@/store/notificationReducer/notificationReducer";
import { NotificationState } from "@/types/notification";
import { useEffect } from "react";
import { EntryContext } from "@/types";

const Notification: React.FC = () => {
  const dispatch = useDispatch();

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
  const { isLoading, data = undefined } = useQuery({
    queryKey: ["notification-list"],
    queryFn: () => notificationService.getAllNotifications(),
    refetchOnWindowFocus: false,
    enabled: !isNotificationsLoaded,
  });
  const { mutate } = useMutation({
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
  useEffect(() => {
    if (isLoading || !data || isNotificationsLoaded) return;
    dispatch(loadNotifications(data || []));
  }, [data]);

  const navigate = useNavigate();

  const onAddNotification = () => {
    navigate(`/notification/add-notification`);
  };
  const onNotificationDetails = (notificationId: string) => {
    navigate(`/notification/${notificationId}`);
  };
  const onEdit = () => {
    navigate(`/notification/${notificationId}/edit`);
  };
  const onDelete = () => {
    notificationId && mutate(notificationId);
  };

  const notificationContext: EntryContext = {
    type: "Notification",
    onAddEntry: onAddNotification,
    showEntryDetails: onNotificationDetails,
    isEntryLoaded: isNotificationsLoaded,
    entries: notifications,
    activeEntry: activeNotification,
    onEditEntry: onEdit,
    onDeleteEntry: onDelete,
  };
  return <Outlet context={notificationContext} />;
};

export default Notification;
