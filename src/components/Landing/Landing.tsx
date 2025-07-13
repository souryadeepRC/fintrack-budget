import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "@/store/appReducer/appSelectors";
import Login from "@/components/Landing/Login/Login";
import Profile from "@/components/Landing/Profile";

const Landing = () => {
  const isLoggedIn: boolean = useSelector(selectIsLoggedIn);

  return <>{isLoggedIn ? <Profile /> : <Login />}</>;
};

export default Landing;
