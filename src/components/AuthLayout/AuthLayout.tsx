import { useSelector } from "react-redux";
import { selectIsAppDataLoaded } from "@/store/appReducer/appSelectors";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useUserExistence } from "@/hooks";
import { Loader } from "@/components/common";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { isLoading } = useUserExistence();
  const isAppDataLoaded: boolean = useSelector(selectIsAppDataLoaded);

  useEffect(() => {
    if (isLoading || isAppDataLoaded) return;
    navigate("/");
  }, [isAppDataLoaded]);

  if (isAppDataLoaded) return <>{children}</>;
  if (isLoading) return <Loader />;
};
export default AuthLayout;
