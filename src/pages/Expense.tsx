import { Outlet } from "react-router";

const Expense: React.FC = () => {
  return (
    <div>
      Expense
      <Outlet />
    </div>
  );
};

export default Expense;
