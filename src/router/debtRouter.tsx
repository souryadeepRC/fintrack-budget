import AuthLayout from "@/components/AuthLayout/AuthLayout";
import { DebtDetails, DebtList, EditDebt } from "@/components/Debt";
import { Debt } from "@/pages";
const debtRouter = {
  path: "/debt",
  Component: () => (
    <AuthLayout>
      <Debt />
    </AuthLayout>
  ),
  children: [
    {
      index: true,
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
