import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appReducer/appReducer";
import expenseReducer from "./expenseReducer/expenseReducer";
import debtReducer from "./debtReducer/debtReducer";
import notificationReducer from "./notificationReducer/notificationReducer";

const store = configureStore({
  reducer: {
    app: appReducer,
    expense: expenseReducer,
    debt: debtReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
