import { RootState } from "@/store";
import {
  selectAllExpenses,
  selectExpense,
  selectIsExpenseLoaded,
} from "@/store/expenseReducer/expenseSelectors";
import expenseService from "@/service/Expense";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import {
  loadExpenses,
  removeExpense,
} from "@/store/expenseReducer/expenseReducer";
import { ExpenseState } from "@/types/expense";
import { useEffect } from "react";
import { EntryContext } from "@/types";

const Expense: React.FC = () => {
  const dispatch = useDispatch();

  const { expenseId } = useParams<{ expenseId: string }>();
  const expenses: ExpenseState[] = useSelector(selectAllExpenses);
  const isExpensesLoaded: boolean = useSelector(selectIsExpenseLoaded);
  const activeExpense = useSelector((state: RootState) =>
    expenseId ? selectExpense(state, expenseId) : undefined
  );
  const { isLoading, data = undefined } = useQuery({
    queryKey: ["expense-list"],
    queryFn: () => expenseService.getAllExpenses(),
    refetchOnWindowFocus: false,
    enabled: !isExpensesLoaded,
  });
  const { mutate } = useMutation({
    mutationFn: (id: string) => expenseService.deleteExpense(id),
    onSuccess: function () {
      expenseId && dispatch(removeExpense(expenseId));
      toast.success(`Expense removed successfully`);
      setTimeout(() => navigate("/expense"), 0);
    },
    onError: function () {
      toast.error(`Failed to remove expense`);
    },
  });
  useEffect(() => {
    if (isLoading || !data || isExpensesLoaded) return;
    dispatch(loadExpenses(data || []));
  }, [data]);

  const navigate = useNavigate();

  const onAddExpense = () => {
    navigate(`/expense/add-expense`);
  };
  const onExpenseDetails = (expenseId: string) => {
    navigate(`/expense/${expenseId}`);
  };
  const onEdit = () => {
    navigate(`/expense/${expenseId}/edit`);
  };
  const onDelete = () => {
    expenseId && mutate(expenseId);
  };

  const expenseContext: EntryContext = {
    type: "Expense",
    onAddEntry: onAddExpense,
    showEntryDetails: onExpenseDetails,
    isEntryLoaded: isExpensesLoaded,
    entries: expenses,
    activeEntry: activeExpense,
    onEditEntry: onEdit,
    onDeleteEntry: onDelete,
  };
  return <Outlet context={expenseContext} />;
};

export default Expense;
