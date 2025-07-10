import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { IoIosArrowBack } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { selectExpense } from "@/store/expenseReducer/expenseSelectors";
import { Button, Modal } from "@/components/common";
import classes from "./ExpenseDetails.module.scss";
import { convertDate } from "@/utils";
import { RootState } from "@/store";

const ExpenseDetails = () => {
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const { expenseId } = useParams<{ expenseId: string }>();
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
    console.log("onDelete");
  };
  const onEdit = () => {
    navigate(`/expense/${expenseId}/edit`);
  };
  console.log({ expense });
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
