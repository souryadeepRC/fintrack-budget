import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { IoIosArrowBack } from "react-icons/io";
import { useMutation } from "@tanstack/react-query";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { selectExpense } from "@/store/expenseReducer/expenseSelectors";
import { Button, Modal } from "@/components/common";
import classes from "./ExpenseDetails.module.scss";
import { convertDate } from "@/utils";
import { RootState } from "@/store";
import expenseDBService from "@/service/Expense";
import { removeExpense } from "@/store/expenseReducer/expenseReducer";
import { toast } from "sonner";

const ExpenseDetails = () => {
  const dispatch = useDispatch();
  const { expenseId } = useParams<{ expenseId: string }>();
  const { mutate } = useMutation({
    mutationFn: (id: string) => expenseDBService.deleteExpense(id),
    onSuccess: function () {
      expenseId && dispatch(removeExpense(expenseId));
      toast.success(`Expense removed successfully`);
      setTimeout(() => navigate("/expense"), 0);
    },
    onError: function () {
      toast.error(`Failed to remove expense`);
    },
  });
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const navigate = useNavigate();
  const expense = useSelector((state: RootState) =>
    expenseId ? selectExpense(state, expenseId) : undefined
  );
  const toggleIsDelete = () => {
    setIsDelete((isDelete) => !isDelete);
  };
  const onBack = () => {
    navigate(-1);
  };
  const onDelete = () => {
    expenseId && mutate(expenseId);
  };
  const onEdit = () => {
    navigate(`/expense/${expenseId}/edit`);
  };
  if (!expense)
    return (
      <div className={classes.expense__container}>
        <Button disabled onClick={onBack}>
          Back
        </Button>
        No Expense Found
      </div>
    );
  return (
    <div className={classes.expense__container}>
      <Modal isOpen={isDelete} onClose={toggleIsDelete}>
        <div className={classes.delete__dialog}>
          <h4>Do you really want to Delete this expense</h4>
          <div className={classes.action__btns}>
            <Button mode="error" onClick={onDelete}>
              Yes
            </Button>
            <Button onClick={toggleIsDelete}>Cancel</Button>
          </div>
        </div>
      </Modal>

      <Button
        variant="outlined"
        onClick={onBack}
        startIcon={<IoIosArrowBack />}
      >
        Back
      </Button>
      <section className={classes.expense__header}>
        <h2>Expense</h2>
        <div className={classes.expense__actions}>
          <Button variant="outlined" onClick={onEdit} startIcon={<FaRegEdit />}>
            Edit
          </Button>
          <Button
            mode="error"
            onClick={toggleIsDelete}
            startIcon={<AiOutlineDelete />}
          >
            Remove
          </Button>
        </div>
      </section>
      <section className={classes.expense__details}>
        <h5 className={classes.expense__description}>{expense?.title}</h5>
        <p className={classes.expense__category}>{expense?.category}</p>
        <p>
          <strong>Amount:&nbsp;</strong>
          Rs.&nbsp;{expense?.amount}
        </p>
        <p>
          <strong>Date:&nbsp;</strong>
          {convertDate(expense?.date)}
        </p>
        <p>
          <strong>Payment Mode:&nbsp;</strong>
          {expense?.mode}
        </p>
        <p className={classes.expense__note}>
          <strong>Note:&nbsp;</strong>
          <em>{expense?.note}</em>
        </p>
      </section>
    </div>
  );
};

export default ExpenseDetails;
