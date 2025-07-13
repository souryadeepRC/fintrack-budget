import { useDispatch } from "react-redux";

import authService from "@/service/Auth";
import { setUserDetails } from "@/store/appReducer/appReducer";

const useAuth = () => {
  const dispatch = useDispatch();

  const checkUserAuth = (callback: () => void) => {
    authService
      .getCurrentUser()
      .then((data: any) => {
        dispatch(setUserDetails(data?.name || ""));
      })
      .catch(() => {
        callback();
      });
  };
  return checkUserAuth;
};

export default useAuth;
