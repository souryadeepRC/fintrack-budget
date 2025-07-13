import { DebtDetails, DebtList, EditDebt } from "@/components/Debt";
import { Debt } from "@/pages";
import { Navigate } from "react-router";

const debtRouter = {
  path: "/debt",
  Component: Debt,
  children: [
    {
      index: true,
      Component: () => <Navigate to="/debt/all" />,
    },
    {
      path: "/debt/all",
      Component: DebtList,
    },
    {
      path: "/debt/filter",
      Component: () => <>Filter</>,
    },
    {
      path: "/debt/add-debt",
      Component: EditDebt,
    },
    {
      path: "/debt/:debtId",
      Component: DebtDetails,
    },
    {
      path: "/debt/:debtId/edit",
      Component: EditDebt,
    },
  ],
};

export default debtRouter;
