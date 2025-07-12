import { NotificationState } from "@/types/notification";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface notificationState {
  isLoaded: boolean;
  notifications: NotificationState[];
}

const initialState: notificationState = {
  isLoaded: false,
  notifications: [],
};
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    loadNotifications: (state, action: PayloadAction<NotificationState[]>) => {
      return {
        ...state,
        isLoaded: true,
        notifications: action.payload,
      };
    },
    addNotification: (state, action: PayloadAction<NotificationState>) => {
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      };
    },
    editNotification: (state, action: PayloadAction<NotificationState>) => {
      const modifiedNotification = action.payload;
      return {
        ...state,
        notifications: state.notifications.map(
          (notification: NotificationState) => {
            if (notification.id !== modifiedNotification.id)
              return notification;
            return { ...notification, ...modifiedNotification };
          }
        ),
      };
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification: NotificationState) =>
            notification.id !== action.payload
        ),
      };
    },
  },
});

export const {
  loadNotifications,
  addNotification,
  editNotification,
  removeNotification,
} = notificationSlice.actions;

export default notificationSlice.reducer;
