import { Button, FormField, Modal } from "@/components/common";
import { RootState } from "@/store";
import { selectExpense } from "@/store/expenseReducer/expenseSelectors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useMutation } from "@tanstack/react-query";

import expenseDBService from "@/service/Expense";
import classes from "./EditExpense.module.scss";
import { useSettings } from "@/hooks";
import { ExpenseState } from "@/types/expense";
import { toast } from "sonner";
import { editExpense } from "@/store/expenseReducer/expenseReducer";
import { formatIsoToDate } from "@/utils";

type ExpenseDetailsState = {
  title: string;
  amount: string;
  category: string; // e.g. Food, entertainment
  date: string;
  mode: string; // Payment Mode e.g. creditCard, cash
  note: string;
};
const initialState = {
  id: "",
  title: "",
  amount: "",
  category: "",
  date: "",
  mode: "Gpay",
  note: "",
};
type Errors = Partial<Record<keyof ExpenseDetailsState, string>>;
const EditExpense = () => {
  const dispatch = useDispatch();
  const { mutate } = useMutation({
    mutationFn: (expense: ExpenseState) =>
      expenseDBService.storeExpense(expense),
    onSuccess: function (response: ExpenseState) {
      dispatch(editExpense(response));
      toast.success(`Expense added under Category: ${response.category}`);
      setTimeout(() => navigate("/expense"), 0);
    },
    onError: function () {
      toast.error(`Failed to add expense`);
    },
  });

  const [isFormLeaving, setIsFormLeaving] = useState<boolean>(false);
  const options = useSettings();
  const [details, setDetails] = useState<ExpenseDetailsState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const { expenseId } = useParams<{ expenseId: string }>();
  const expense = useSelector((state: RootState) =>
    expenseId ? selectExpense(state, expenseId) : undefined
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!expense) return;
    setDetails({
      ...expense,
      amount: `${expense.amount}`,
      date: formatIsoToDate(expense.date),
    });
  }, [expense]);
  const toggleIsFormLeaving = () => {
    setIsFormLeaving((isFormLeaving) => !isFormLeaving);
  };
  const onFormLeave = () => {
    navigate(-1);
  };
  const validate = () => {
    const errs: Errors = {};
    if (!details.title) errs.title = "Title is required";
    if (!details.amount || isNaN(Number(details.amount)))
      errs.amount = "Valid amount required";
    if (!details.date) errs.date = "Date is required";
    if (!details.category) errs.category = "Category is required";
    if (!details.mode) errs.mode = "Payment mode is required";
    return errs;
  };
  const onClear = (e: any) => {
    e.preventDefault();
    setDetails(initialState);
  };
  const onSave = (e: any) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    mutate({ ...details, amount: Number(details.amount), id: expenseId || "" });
  };

  const onChange = (name: string, value: string) => {
    setDetails((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  return (
    <div className={classes.edit_expense__container}>
      <Modal isOpen={isFormLeaving} onClose={toggleIsFormLeaving}>
        <div className={classes.form_leaving__dialog}>
          <h4>Do you really want to leave from here</h4>
          <div className={classes.action__btns}>
            <Button onClick={onFormLeave}>Yes</Button>
            <Button onClick={toggleIsFormLeaving}>Cancel</Button>
          </div>
        </div>
      </Modal>
      <div className={classes.edit_expense__header}>
        <Button onClick={toggleIsFormLeaving}>Back</Button>
        <h4>{expenseId ? "Edit" : "Add"} Expense</h4>
      </div>
      <form className={classes.expense__form}>
        <div className={classes.form__inputs}>
          <FormField
            mandatory
            name="title"
            label="Title"
            type="text"
            value={details.title}
            onChange={onChange}
            error={errors.title}
          />
          <FormField
            mandatory
            name="amount"
            label="Amount"
            type="number"
            value={details.amount}
            onChange={onChange}
            error={errors.amount}
          />
          <FormField
            mandatory
            name="date"
            label="Date"
            type="date"
            value={details.date}
            onChange={onChange}
            error={errors.date}
          />
          <FormField
            mandatory
            name="category"
            label="Category"
            type="select"
            value={details.category}
            onChange={onChange}
            error={errors.category}
            options={options.expenseCategories}
          />
          <FormField
            mandatory
            name="mode"
            label="Payment Mode"
            type="select"
            value={details.mode}
            onChange={onChange}
            error={errors.mode}
            options={options.paymentModes}
          />
          <FormField
            name="note"
            label="Note"
            type="textarea"
            value={details.note}
            onChange={onChange}
          />
        </div>
        <div className={classes.form__actions}>
          <Button onClick={onSave}>{expenseId ? "Save" : "Create"}</Button>
          <Button onClick={onClear}>Clear</Button>
        </div>
      </form>
    </div>
  );
};

export default EditExpense;
