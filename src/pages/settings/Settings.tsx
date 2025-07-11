import { useSettings } from "@/hooks";

import CategoryOption from "@/components/CategoryOption/CategoryOption";
import classes from "./Settings.module.scss";

const Settings: React.FC = () => {
  const settingOptions = useSettings();
  return (
    <div className={classes.settings__container}>
      <CategoryOption
        title="Payment Mode"
        options={settingOptions.paymentModes}
      />
      <CategoryOption
        title="Expense Category"
        options={settingOptions.expenseCategories}
      />
    </div>
  );
};

export default Settings;
