import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appReducer/appReducer";
import expenseReducer from "./expenseReducer/expenseReducer";
import debtReducer from "./debtReducer/debtReducer";

const store = configureStore({
  reducer: {
    app: appReducer,
    expense: expenseReducer,
    debt: debtReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
