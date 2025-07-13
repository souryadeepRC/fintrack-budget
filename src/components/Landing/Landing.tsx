import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "@/store/appReducer/appSelectors";
import Profile from "@/components/Landing/Profile";

const Landing = () => {
  const isLoggedIn: boolean = useSelector(selectIsLoggedIn);

  if (isLoggedIn) return <Profile />;
  return <></>;
};

export default Landing;
