import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

import { AlertDialog, Button } from "@/components/common";
import AuthService from "@/service/Auth";
import { selectUsername } from "@/store/appReducer/appSelectors";
import { resetApp } from "@/store/appReducer/appReducer";
import { resetDebt } from "@/store/debtReducer/debtReducer";
import { ExpenseAnalytics } from "./Analytics";
import DebtAnalytics from "./Analytics/DebtAnalytics";
import { resetExpense } from "@/store/expenseReducer/expenseReducer";
import { resetNotification } from "@/store/notificationReducer/notificationReducer";
import classes from "./Profile.module.scss";

const Profile: React.FC = () => {
  const username: string = useSelector(selectUsername);

  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const toggleAlertVisibility = () => {
    setShowAlert((showAlert) => !showAlert);
  };
  const { mutate: onLogout } = useMutation({
    mutationFn: () => AuthService.logout(),
    onSuccess: function () {
      dispatch(resetApp());
      dispatch(resetExpense());
      dispatch(resetDebt());
      dispatch(resetNotification());
      toast.error("You are Logged out from Fintrack");
    },
    onError: function () {
      toast.error("Failed to logout");
    },
  });

  return (
    <div className={classes.profile__container}>
      <AlertDialog
        isOpen={showAlert}
        onClose={toggleAlertVisibility}
        message="Are you sure you want to logout?"
        actions={[
          {
            label: "Yes",
            mode: "alert",
            onClick: onLogout,
          },
          {
            label: "Cancel",
            variant: "text",
            onClick: toggleAlertVisibility,
          },
        ]}
      />

      <div className={classes.profile__heading}>
        <div className={classes.profile__heading__title}>
          <FaUserCircle />
          <h2>My Profile</h2>
        </div>
        <Button
          variant="contained"
          mode="alert"
          onClick={toggleAlertVisibility}
          startIcon={<FaSignOutAlt />}
        >
          Logout
        </Button>
      </div>
      <h2 className={classes.user__name}> {username}</h2>
      <div className={classes.profile__analytics}>
        <ExpenseAnalytics />
        <DebtAnalytics />
      </div>
    </div>
  );
};
export default Profile;
