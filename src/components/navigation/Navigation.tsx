import { useSelector } from "react-redux";
import { NavLink } from "react-router";

import { GiTakeMyMoney } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { SiExpensify } from "react-icons/si";
import { MdOutlinePendingActions } from "react-icons/md";
import { AiFillNotification } from "react-icons/ai";

import APP_CONSTANTS from "@/constants";
import { selectIsLoggedIn } from "@/store/appReducer/appSelectors";
import classes from "./Navigation.module.scss";

type NavigationItem = {
  path: string;
  label: string;
  Icon: any;
};
const NAVIGATION_LIST: NavigationItem[] = [
  {
    path: "/expense",
    label: "Expense",
    Icon: SiExpensify,
  },
  {
    path: "/debt",
    label: "Debt",
    Icon: MdOutlinePendingActions,
  },
  {
    path: "/notification",
    label: "Notification",
    Icon: AiFillNotification,
  },
  {
    path: "",
    label: "Profile",
    Icon: FaUserCircle,
  },
];
const Navigation: React.FC = () => {
  const isLoggedIn: boolean = useSelector(selectIsLoggedIn);
  if (!isLoggedIn) return <></>;
  return (
    <header className={classes.header__container}>
      <h1>
        <GiTakeMyMoney />
        &nbsp;
        {APP_CONSTANTS.title}
      </h1>
      <nav>
        <ul className={classes.navigation__container}>
          {NAVIGATION_LIST.map((navigation: NavigationItem) => {
            return (
              <li key={navigation.path}>
                <NavLink to={navigation.path}>
                  <div className={classes.navigation__item}>
                    <navigation.Icon />
                    {navigation.label}
                  </div>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
