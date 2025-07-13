import {
  selectIsAppDataLoaded,
  selectIsLoggedIn,
} from "@/store/appReducer/appSelectors";
import { useSelector } from "react-redux";
import { RouterProvider } from "react-router";
import { useEffect, useRef, useState } from "react";
import { Loader } from "@/components/common";
import defaultRouter from "./defaultRouter";
import { useAuth, useFetchAllRecords } from "@/hooks";
import router from ".";

const AppRoutes = () => {
  const isAppDataLoaded = useSelector(selectIsAppDataLoaded);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const loadAppData = useFetchAllRecords();
  const checkUserAuth = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const initialRender = useRef(false);

  useEffect(() => {
    if (initialRender.current) return;

    checkUserAuth(function () {
      setIsLoading(false);
    });

    initialRender.current = true;
  }, []);

  useEffect(() => {
    if (!isLoggedIn || isAppDataLoaded) return;

    !isLoading && setIsLoading(true);
    loadAppData(function () {
      setIsLoading(false);
    });
  }, [isLoggedIn, isAppDataLoaded]);

  if (isLoading && isLoggedIn) return <Loader />;
  if (isLoading) return <Loader />;

  return <RouterProvider router={isAppDataLoaded ? router : defaultRouter} />;
};

export default AppRoutes;
