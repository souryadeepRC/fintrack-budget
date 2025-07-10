import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

const Expense: React.FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Expense;
