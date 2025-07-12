import { RootState } from "@/store";
import {
  selectAllDebts,
  selectDebt,
  selectIsDebtLoaded,
} from "@/store/debtReducer/debtSelectors";
import debtService from "@/service/Debt";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import {
  addDebt,
  editDebt,
  loadDebts,
  removeDebt,
} from "@/store/debtReducer/debtReducer";
import { DebtState } from "@/types/debt";
import { useEffect } from "react";
import { EntryContext } from "@/types";

const debt: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { debtId } = useParams<{ debtId: string }>();

  const debts: DebtState[] = useSelector(selectAllDebts);
  const isDebtsLoaded: boolean = useSelector(selectIsDebtLoaded);

  const activeDebt = useSelector((state: RootState) =>
    debtId ? selectDebt(state, debtId) : undefined
  );

  const { isLoading, data = undefined } = useQuery({
    queryKey: ["debt-list"],
    queryFn: () => debtService.getAllDebts(),
    refetchOnWindowFocus: false,
    enabled: !isDebtsLoaded,
  });
  const modifyMutation = useMutation({
    mutationFn: (debt: DebtState) => debtService.storeDebt(debt),
    onSuccess: function (response: DebtState) {
      debtId ? dispatch(editDebt(response)) : dispatch(addDebt(response));
      toast.success(
        debtId
          ? "Debt saved successfully"
          : `Debt added under Category: ${response.category}`
      );
    },
    onError: function () {
      toast.error(`Failed to ${debtId ? "save" : "add"} debt`);
    },
  });

  const { mutate: deleteDebt } = useMutation({
    mutationFn: (id: string) => debtService.deleteDebt(id),
    onSuccess: function () {
      debtId && dispatch(removeDebt(debtId));
      toast.success(`debt removed successfully`);
      setTimeout(() => navigate("/debt"), 0);
    },
    onError: function () {
      toast.error(`Failed to remove debt`);
    },
  });

  useEffect(() => {
    if (isLoading || !data || isDebtsLoaded) return;
    dispatch(loadDebts(data || []));
  }, [data]);

  const debtContext: EntryContext = {
    type: "debt",
    navigation: {
      addEntry: () => navigate(`/debt/add-debt`),
      editEntry: () => {
        console.log("towards Edit");

        navigate(`/debt/${debtId}/edit`);
      },
      showAll: (debtId: string) => navigate(`/debt/${debtId}`),
    },
    isEntryLoaded: isDebtsLoaded,
    entries: debts,
    activeEntry: activeDebt,
    actions: {
      modify: (debt: any) => modifyMutation.mutate(debt),
      delete: (debtId: string) => deleteDebt(debtId),
    },
    sideEffects: {
      modify: {
        isSuccess: modifyMutation.isSuccess,
        success: () =>
          setTimeout(() => {
            navigate("/debt");
            modifyMutation.reset();
          }, 0),
      },
    },
  };
  return <Outlet context={debtContext} />;
};

export default debt;
