import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "@/store/appReducer/appSelectors";
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
  const isLoggedIn: boolean = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoading || isLoggedIn) return;
    navigate("/");
  }, [isLoggedIn]);

  if (isLoading) return <Loader />;
  if (isLoggedIn) return <>{children}</>;
};
export default AuthLayout;
