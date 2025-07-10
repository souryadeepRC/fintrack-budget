import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appReducer/appReducer";
import expenseReducer from "./expenseReducer/expenseReducer";

const store = configureStore({
  reducer: {
    app: appReducer,
    expense: expenseReducer,
    /*  
    debts:
    notifications:
    settings: */
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
