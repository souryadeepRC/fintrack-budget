import { FaSpinner } from "react-icons/fa";
import classes from "./Loader.module.scss";

const Loader: React.FC = () => {
  return (
    <div className={classes.loaderContainer}>
      <FaSpinner className={classes.spinner} />
    </div>
  );
};

export default Loader;
