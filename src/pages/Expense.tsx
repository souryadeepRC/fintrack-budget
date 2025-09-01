import { RootState } from "@/store";
import {
  selectAllExpenses,
  selectExpense,
  selectIsExpenseLoaded,
} from "@/store/expenseReducer/expenseSelectors";
import expenseService from "@/service/Expense";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import {
  addExpense,
  editExpense,
  removeExpense,
} from "@/store/expenseReducer/expenseReducer";
import { ExpenseState } from "@/types/expense";
import { EntryContext } from "@/types";

const Expense: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { expenseId } = useParams<{ expenseId: string }>();

  const expenses: ExpenseState[] = useSelector(selectAllExpenses);
  const isExpensesLoaded: boolean = useSelector(selectIsExpenseLoaded);

  const activeExpense = useSelector((state: RootState) =>
    expenseId ? selectExpense(state, expenseId) : undefined
  );

  const modifyMutation = useMutation({
    mutationFn: (expense: ExpenseState) => expenseService.storeExpense(expense),
    onSuccess: function (response: ExpenseState) {
      expenseId
        ? dispatch(editExpense(response))
        : dispatch(addExpense(response));
      toast.success(
        expenseId
          ? "Expense saved successfully"
          : `Expense added under Category: ${response.category}`
      );
    },
    onError: function () {
      toast.error(`Failed to ${expenseId ? "save" : "add"} expense`);
    },
  });

  const { mutate: deleteExpense } = useMutation({
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

  const expenseContext: EntryContext = {
    type: "Expense",
    navigation: {
      addEntry: () => navigate(`/expense/add-expense`),
      editEntry: () => navigate(`/expense/${expenseId}/edit`),
      showEntry: (expenseId: string) => navigate(`/expense/${expenseId}`),
    },
    isEntryLoaded: isExpensesLoaded,
    entries: expenses,
    activeEntry: activeExpense,
    actions: {
      modify: (expense: any) => modifyMutation.mutate(expense),
      delete: (expenseId: string) => deleteExpense(expenseId),
    },
    sideEffects: {
      modify: {
        isSuccess: modifyMutation.isSuccess,
        success: () =>
          setTimeout(() => {
            navigate("/expense");
            modifyMutation.reset();
          }, 0),
      },
    },
  };
  return <Outlet context={expenseContext} />;
};

export default Expense;
