import { useState, useEffect } from "react";
// library
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
// store
import {
  dataLoadingComplete,
  setUserDetails,
} from "@/store/appReducer/appReducer";
import {
  selectIsAppDataLoaded,
  selectIsLoggedIn,
} from "@/store/appReducer/appSelectors";
// service
import authService from "@/service/Auth";

import expenseService from "@/service/Expense";
import debtService from "@/service/Debt";
import notificationService from "@/service/Notification";
import { loadExpenses } from "@/store/expenseReducer/expenseReducer";
import { loadDebts } from "@/store/debtReducer/debtReducer";
import { loadNotifications } from "@/store/notificationReducer/notificationReducer";

function fetchRecords() {
  const expensePromise = expenseService.getAllExpenses();
  const debtPromise = debtService.getAllDebts();
  const notificationPromise = notificationService.getAllNotifications();

  return Promise.allSettled([expensePromise, debtPromise, notificationPromise]);
}

const useUserExistence = (): { isLoading: boolean; isUserExist: boolean } => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const isLoggedIn: boolean = useSelector(selectIsLoggedIn);
  const isAppDataLoaded: boolean = useSelector(selectIsAppDataLoaded);

  const { isFetched, data, isSuccess } = useQuery({
    queryKey: ["user-existence"],
    queryFn: () => authService.getCurrentUser(),
    retry: 0,
    enabled: !isLoggedIn,
  });

  useEffect(() => {
    if (isAppDataLoaded) return;
    if (!isFetched) return;
    if (isSuccess && data) {
      dispatch(setUserDetails(data?.name || ""));
    }
    fetchRecords()
      .then((response) => {
        const [expense, debt, notification]: any = response;
        dispatch(loadExpenses(expense?.value || []));
        dispatch(loadDebts(debt?.value || []));
        dispatch(loadNotifications(notification?.value || []));
        dispatch(dataLoadingComplete());
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isFetched, isSuccess, data, isAppDataLoaded]);

  return { isLoading, isUserExist: isSuccess && !!data };
};

export default useUserExistence;
