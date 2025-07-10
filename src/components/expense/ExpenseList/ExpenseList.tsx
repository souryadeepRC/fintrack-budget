import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { CiCalendarDate } from "react-icons/ci";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";

import expenseService from "@/service/Expense";
import { Button } from "@/components/common";
import {
  selectAllExpenses,
  selectIsExpenseLoaded,
} from "@/store/expenseReducer/expenseSelectors";
import { convertDate } from "@/utils";
import { loadExpenses } from "@/store/expenseReducer/expenseReducer";
import classes from "./ExpenseList.module.scss";
import { ExpenseState } from "@/types/expense";

const ExpenseList = () => {
  const expenses: ExpenseState[] = useSelector(selectAllExpenses);
  const isExpensesLoaded: boolean = useSelector(selectIsExpenseLoaded);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, data } = useQuery({
    queryKey: ["todos"],
    queryFn: () => expenseService.getAllExpenses(),
    refetchOnWindowFocus: false,
    enabled: !isExpensesLoaded,
  });
  useEffect(() => {
    if (!data?.length || isExpensesLoaded) return;
    dispatch(loadExpenses(data));
  }, [data]);

  const onAddExpense = () => {
    navigate(`/expense/add-expense`);
  };
  const onShowMore = (id: string) => {
    navigate(`/expense/${id}`);
  };
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className={classes.expense__container}>
      <div className={classes.expense__actions}>
        <Button onClick={onAddExpense}>Add Expense</Button>
      </div>
      <section className={classes.expense__list}>
        {expenses.map((expense) => {
          return (
            <div
              key={expense.id}
              onClick={() => onShowMore(expense.id)}
              className={classes.expense__item}
            >
              <p className={classes.expense__category}>{expense.category}</p>
              <h4 className={classes.expense__description}>{expense.title}</h4>
              <p className={classes.expense__amount}>
                <RiMoneyRupeeCircleLine />
                {expense.amount}
              </p>
              <p className={classes.expense__date}>
                <CiCalendarDate />
                {convertDate(expense.date)}
              </p>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default ExpenseList;
