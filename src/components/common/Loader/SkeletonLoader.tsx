import { GiTakeMyMoney } from "react-icons/gi";
import classes from "./SkeletonLoader.module.scss";

const SkeletonLoader: React.FC = () => {
  return (
    <div className={classes.loaderContainer}>
      <div className={classes.login__header}>
        <h2 className={classes.login__header__title}>
          <GiTakeMyMoney /> FinTrack
        </h2>
        <h2 className={classes.login__header__description}>
          Smart Budget & Expense Tracker
        </h2>
      </div>
      <div className={classes.skeletonWrapper}>
        {Array(6)
          .fill("T")
          .map((_, index) => (
            <div key={index} className={classes.skeletonCard}>
              <div className={classes.skeletonContent}>
                <div className={classes.skeletonLine}></div>
                <div className={classes.skeletonLineShort}></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;
