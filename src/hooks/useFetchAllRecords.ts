import { useDispatch } from "react-redux";

import expenseService from "@/service/Expense";
import debtService from "@/service/Debt";
import notificationService from "@/service/Notification";
import { loadExpenses } from "@/store/expenseReducer/expenseReducer";
import { loadDebts } from "@/store/debtReducer/debtReducer";
import { loadNotifications } from "@/store/notificationReducer/notificationReducer";
import { dataLoadingComplete } from "@/store/appReducer/appReducer";

function fetchRecords() {
  const expensePromise = expenseService.getAllExpenses();
  const debtPromise = debtService.getAllDebts();
  const notificationPromise = notificationService.getAllNotifications();

  return Promise.allSettled([expensePromise, debtPromise, notificationPromise]);
}
const useFetchAllRecords = () => {
  const dispatch = useDispatch();

  const loadAppData = (callback?: any) => {
    fetchRecords()
      .then((response: any) => {
        const [expense, debt, notification]: any = response;
        dispatch(loadExpenses(expense?.value || []));
        dispatch(loadDebts(debt?.value || []));
        dispatch(loadNotifications(notification?.value || []));
        dispatch(dataLoadingComplete());
      })
      .finally(() => {
        callback?.();
      });
  };
  return loadAppData;
};

export default useFetchAllRecords;
