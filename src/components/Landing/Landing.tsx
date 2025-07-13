import { useSelector } from "react-redux";
import { useUserExistence } from "@/hooks";
import { Loader } from "@/components/common";
import { selectIsLoggedIn } from "@/store/appReducer/appSelectors";
import Login from "@/components/Landing/Login/Login";
import Profile from "@/components/Landing/Profile";

const Landing = () => {
  const { isLoading } = useUserExistence();
  const isLoggedIn: boolean = useSelector(selectIsLoggedIn);
  if (isLoading) return <Loader />;
  return <>{isLoggedIn ? <Profile /> : <Login />}</>;
};

export default Landing;
