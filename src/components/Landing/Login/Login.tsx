import { useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";

import { Button } from "@/components/common";
import { useMutation } from "@tanstack/react-query";
import AuthService from "@/service/Auth";
import { setUserDetails } from "@/store/appReducer/appReducer";
import { MdLogin } from "react-icons/md";
import classes from "./Login.module.scss";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const { isPending, mutate } = useMutation({
    mutationFn: (data: any) => AuthService.login(data),
    onSuccess: function (response: any) {
      dispatch(setUserDetails(response.name));
      toast.success(`Logged In successfully`);
    },
    onError: function () {
      toast.error(`Failed to Login`);
    },
  });
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }
    mutate(formData);
  };

  return (
    <div className={classes.login__container}>
      <div className={classes.login__header}>
        <h2 className={classes.login__header__title}>
          <GiTakeMyMoney /> FinTrack
        </h2>
        <h2 className={classes.login__header__description}>
          Smart Budget & Expense Tracker
        </h2>
      </div>
      <form className={classes.login__form} onSubmit={handleSubmit}>
        <div className={classes.login__input_group}>
          <FaUserAlt className={classes.icon} />
          <input
            type="text"
            name="email"
            placeholder="Email"
            autoComplete="user email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className={classes.login__input_group}>
          <FaLock className={classes.icon} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="new password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {error && <p className={classes.login__error}>{error}</p>}
        <Button
          variant="contained"
          type="submit"
          disabled={isPending}
          startIcon={<MdLogin />}
          className={`${classes.login__button} ${
            isPending ? classes.disabled : ""
          }`}
        >
          {isPending ? "Logging In.." : "Login to Continue"}
        </Button>
      </form>
    </div>
  );
};

export default Login;
