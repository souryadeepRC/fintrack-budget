import { SiExpensify } from "react-icons/si";
import { MdOutlinePendingActions } from "react-icons/md";
import { AiFillNotification } from "react-icons/ai";
/* import { FiSettings } from "react-icons/fi"; */
import { NavLink } from "react-router";

import APP_CONSTANTS from "@/constants";
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
  /* {
    path: "/settings",
    label: "Settings",
    Icon: FiSettings,
  }, */
];
const Navigation: React.FC = () => {
  return (
    <header className={classes.header__container}>
      <h1>
        <NavLink to="/">{APP_CONSTANTS.title}</NavLink>
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
