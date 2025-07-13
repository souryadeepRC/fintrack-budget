import { useState, useEffect } from "react";
// library
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
// store
import { setUserDetails } from "@/store/appReducer/appReducer";
import { selectIsLoggedIn } from "@/store/appReducer/appSelectors";
// service
import authService from "@/service/Auth";

const useUserExistence = (): { isLoading: boolean; isUserExist: boolean } => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const isLoggedIn: boolean = useSelector(selectIsLoggedIn);
  const { isFetched, data, isSuccess } = useQuery({
    queryKey: ["user-existence"],
    queryFn: () => authService.getCurrentUser(),
    retry: 0,
    enabled: !isLoggedIn,
  });

  useEffect(() => {
    if (!isFetched) return;
    if (isSuccess && data) {
      dispatch(setUserDetails(data?.name || ""));
    }
    setIsLoading(false);
  }, [isFetched, isSuccess, data]);

  return { isLoading, isUserExist: isSuccess && !!data };
};

export default useUserExistence;
