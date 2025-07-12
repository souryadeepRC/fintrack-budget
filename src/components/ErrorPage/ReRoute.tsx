import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/common";
import classes from "./ErrorPage.module.scss";

const MAX_TIME_LIMIT: number = 5;
const timerThreshold = 500;
const ReRoute = () => {
  const navigate = useNavigate();
  const [timerLeft, setTimeLeft] = useState<number>(MAX_TIME_LIMIT);

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, timerThreshold * MAX_TIME_LIMIT);

    const interval = setInterval(() => {
      setTimeLeft((timerLeft) => timerLeft - 1);
    }, timerThreshold);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className={classes.error_page__container}>
      <h1 className={classes.error__heading}>Oops! Page not found.</h1>
      <p className={classes.error__message}>
        The page you’re looking for doesn’t exist. You’ll be redirected to the
        homepage in {timerLeft}
      </p>
      <Button className={classes.button} onClick={() => navigate("/")}>
        Go Home Now
      </Button>
    </div>
  );
};

export default ReRoute;
