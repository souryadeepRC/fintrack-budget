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
import { loadDebts, removeDebt } from "@/store/debtReducer/debtReducer";
import { DebtState } from "@/types/debt";
import { useEffect } from "react";
import { EntryContext } from "@/types";

const Debt: React.FC = () => {
  
  const dispatch = useDispatch();

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
  const { mutate } = useMutation({
    mutationFn: (id: string) => debtService.deleteDebt(id),
    onSuccess: function () {
      debtId && dispatch(removeDebt(debtId));
      toast.success(`Debt removed successfully`);
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


  const navigate = useNavigate();

  const onAddDebt = () => {
    navigate(`/debt/add-debt`);
  };
  const onDebtDetails = (debtId: string) => {
    navigate(`/debt/${debtId}`);
  };
  const onEdit = () => {
    navigate(`/debt/${debtId}/edit`);
  };
  const onDelete = () => {
    debtId && mutate(debtId);
  };

  const debtContext: EntryContext = {
    type: "Debt",
    onAddEntry: onAddDebt,
    showEntryDetails: onDebtDetails,
    isEntryLoaded: isDebtsLoaded,
    entries: debts,
    activeEntry: activeDebt,
    onEditEntry: onEdit,
    onDeleteEntry: onDelete,
  };
  return (
    <div>
      <Outlet context={debtContext} />
    </div>
  );
};

export default Debt;
